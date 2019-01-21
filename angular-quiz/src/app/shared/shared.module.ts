import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { COMPONENTS } from './components';

const modules = [BrowserModule, ReactiveFormsModule];

@NgModule({
	imports: [modules],
	exports: [modules, COMPONENTS],
	declarations: [COMPONENTS]
})
export class SharedModule { }
