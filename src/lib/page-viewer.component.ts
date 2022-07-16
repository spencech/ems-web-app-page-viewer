import { Component, AfterViewInit, Input, Output, EventEmitter, HostBinding, TemplateRef, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PageViewerService } from "./page-viewer.service";
import { trace, delay, getparams } from "ems-web-app-utils";

declare const gtag:any;

@Component({
  selector: 'page-viewer',
  template: `<ng-container *ngIf="currentTemplate"><ng-container *ngTemplateOutlet="currentTemplate"></ng-container></ng-container><ng-content></ng-content><div class="style-container" [innerHtml]="styles"></div>`,
  styleUrls: ["./page-viewer.component.less"]
})
export class PageViewerComponent implements AfterViewInit {
  @HostBinding("class.transitioning") transitioning: boolean = false;
  @Output("change") onChange: EventEmitter<string|null> = new EventEmitter();
  @Input("history") history: boolean = false;

  public requestedPage: string | null = null;
  public currentPage: string | null = null;
  public currentTemplate!: TemplateRef<any>;
  public styles!: SafeHtml;
  public google?: any;

  protected timeout: number = 0;
  protected speed: number = 250;
  
  constructor(protected service: PageViewerService, protected sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.service.storeWebHistory = this.history;
    this.google = (window as any)["gtag"] ?? undefined;

    this.service.page.subscribe((page: string | null) => {
      clearTimeout(this.timeout);
      this.requestedPage = page;
      this.transitioning = true;
      this.timeout = delay(() => this.changePage(page), this.speed);
    });

    window.addEventListener('popstate', (e: PopStateEvent) => {
      const page = e.state?.page as string;
      if(page === this.currentPage) return;
      this.service.setCurrentPage(page, this.service.model["previousPageData"], true);
    });
  }

  ngAfterViewInit(): void {
    delay(this.initializePageViewer);
  }

  protected initializePageViewer = () => {
    if(getparams("page")) {
      clearTimeout(this.timeout);
      this.service.setCurrentPage(getparams("page"));
    }
  }

  protected changePage(page: string | null) {
    this.currentPage = null;
    delay(() => {
      this.currentPage = page; 
      this.currentTemplate = this.service.manifest[page ?? ""]?.template;
      this.track();
    });
    delay(() => {
      this.transitioning = false;
      this.onChange.emit(this.currentPage);
    }, 1);
  }

  protected track() {
    if(!this.google || !this.currentPage) return;
    this.google('event', 'page_view', { page_title: this.currentPage, page_location: `${window.location.origin}/pages/${this.currentPage}`})
  }
}
