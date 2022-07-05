import { Component, Input, ViewChild, TemplateRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { PageViewerService } from "./page-viewer.service";

@Component({
  selector: 'page-template',
  template: `<ng-template #template><ng-content></ng-content></ng-template>`
})
export class PageTemplateComponent implements AfterViewInit  {
	@Input("id") id!: string;
	@Input("title") title?: string;
	@ViewChild("template") template!: TemplateRef<any>;
	constructor(private service: PageViewerService) {}

	ngAfterViewInit() {
		if(!this.id) throw new Error("All <page-template/> elements must have an id attribute.");
		this.service.registerPage(this.id, this.template, this.title);
	}
}
