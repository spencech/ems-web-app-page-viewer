import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageViewerComponent } from './page-viewer.component';
import { PageTemplateComponent } from './page-template.component';



@NgModule({
  declarations: [
    PageViewerComponent,
    PageTemplateComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PageViewerComponent,
    PageTemplateComponent
  ]
})
export class PageViewerModule { }
