import { Component, Input, ViewChild, ContentChildren, ElementRef, TemplateRef, QueryList, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { PageViewerService } from "./page-viewer.service";

@Component({
  selector: 'page-template',
  template: `<ng-content></ng-content>`
})
export class PageTemplateComponent implements AfterViewInit  {
	@Input("id") id!: string;
	@Input("title") title?: string;
	@ContentChildren(TemplateRef) template!: QueryList<any>;
	constructor(private service: PageViewerService, private el: ElementRef) {}

	ngAfterViewInit() {
		if(!this.id) throw new Error("All <page-template/> elements must have an id attribute.");
		this.service.registerPage(this.id, this.template.first, this.title);
	}
}
