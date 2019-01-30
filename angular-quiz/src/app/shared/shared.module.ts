import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { COMPONENTS } from './components';
import { DIRECTIVES } from './directives';

const modules = [BrowserModule, ReactiveFormsModule];

@NgModule({
	imports: [modules],
	exports: [modules, COMPONENTS, DIRECTIVES],
	declarations: [COMPONENTS, DIRECTIVES]
})
export class SharedModule { }
