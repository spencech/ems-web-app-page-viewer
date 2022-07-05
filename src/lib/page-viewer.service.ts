import { Injectable, TemplateRef } from '@angular/core';
import { Observable, Subject, BehaviorSubject, throwError, of } from 'rxjs';
import { getparams } from "ems-web-app-utils";

@Injectable({
  providedIn: 'root'
})
export class PageViewerService {

  public model: Record<string,string|null> = { currentPage: null, previousPage: null };
  public storeWebHistory: boolean = true;

  private pageSource:BehaviorSubject<string|null> = new BehaviorSubject<string|null>(null);
  public page = this.pageSource.asObservable();

  public manifest: Record<string, {title?: string, template: TemplateRef<any>}> = {};

  private title: string = document.title;

  constructor() { }

  public registerPage(id: string, template: TemplateRef<any>, title?: string) {
    this.manifest[id] = { template, title };
  }

  public setCurrentPage(page: string | null, data?: any, ignorePush: boolean = false) {
    const info = this.manifest[page ?? ""];
    
    const pstring = page ? (page.toString().toUpperCase().substring(0,1) + page.toString().substring(1)) : null;
    if(this.storeWebHistory && page && !ignorePush && !getparams().debug) {
      window.history.pushState({ page }, `${info?.title ?? pstring}`, `/?page=${page}`);
    }
    this.model["previousPageData"] = this.model["currentPageData"] ?? this.model["previousPageData"];
    this.model["currentPageData"] = data;
    this.model["previousPage"] = this.model["currentPage"] ?? this.model["previousPage"];
    this.model["currentPage"] = page;
    document.title = info?.title ?? this.title;
    this.pageSource.next(page);
  }
}
