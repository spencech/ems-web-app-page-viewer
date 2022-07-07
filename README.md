# EMS Web Application Components: PageViewer

The PageViewer Angular.io module is authored for use within web applications developed by [Educational Media Solutions](https://educationalmediasolutions.com).

Find the [web application template source code on GitHub](https://github.com/spencech/ems-web-app-template) to review implementation in context.

Find a [working example of this component here](https://ems-web-app.educationalmediasolutions.com).

The embedded component and service expose interfaces for rendering dynamic page content and managing browser history.

You can likely achieve comparable outcomes with angular routing, but we extend this simple implementation to meet custom client requirements for navigation and accessibility.

**Note that this component currently supports only a single implementation per application**, i.e., you can't have two separate page viewers on a single screen.

Also note that styling options are limited, and will need to be customized in your CSS files to meet the needs of your implementation.

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.0.

**Note that this module has a peer dependency on ems-web-app-utils and underscore.js**

	npm i underscore ems-web-app-utils ems-web-app-page-viewer

## Module Implementation

	import { NgModule } from '@angular/core';
	import { BrowserModule } from '@angular/platform-browser';
	import { CommonModule } from '@angular/common';  

	import { AppComponent } from './app.component';
	import { PageViewerModule, PageViewerService } from "ems-web-app-page-viewer";

	@NgModule({
	  declarations: [
	    AppComponent
	  ],
	  imports: [
	    BrowserModule,
	    CommonModule,
	    PageViewerModule
	  ],
	  providers: [ PageViewerService],
	  bootstrap: [ AppComponent ]
	})
	export class AppModule { }

## Component Implementation

	import { Component } from '@angular/core';
	import { PageViewerService } from "ems-web-app-page-viewer";

	@Component({
	  selector: 'app-root',
	  templateUrl: './app.component.html',
	  styleUrls: ['./app.component.less']
	})
	export class AppComponent  {
	  public title: string = "Example Title";
	  constructor(private viewer: PageViewerService) {}
	  showPage1() {
	     this.viewer.setCurrentPage("page-1");
	  }
	  showPage2() {
	     this.viewer.setCurrentPage("page-2");
	  }
	}


## Template Implementation
	<div class="control-buttons">
		<button (click)="showPage1()">Show Page 1</button>
		<button (click)="showPage2()">Show Page 2</button>
	</div>

	<page-viewer class="content-panel" [history]="true">
		<page-template id="page-1" title="Page 1">
			<app-page1></app-page1> <!-- custom component -->
		</page-template>
		<page-template id="page-2">
			<!-- static html -->
			<h1>Page 2 {{ title }}</h1>
			<div>Etiam porta sem malesuada magna mollis euismod. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta sem malesuada magna mollis euismod.</div>
		</page-template>
	</page-viewer>

Under the hood, the "page-template" component converts nested content to an ng-template, that is registered with the PageViewerService and rendered by the PagerViewerComponent.

**Every &lt;page-template/&gt; node must define an "id" attribute**

The optional "history" attribute on the page-viewer element enables browser history tracking when set to true. The default is boolean "false".


## Code scaffolding

Run `ng generate component component-name --project PageViewer` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project PageViewer`.
> Note: Don't forget to add `--project PageViewer` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build PageViewer` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build PageViewer`, go to the dist folder `cd dist/page-viewer` and run `npm publish`.

## Running unit tests

Run `ng test PageViewer` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
