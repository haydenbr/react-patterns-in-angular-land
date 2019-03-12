import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'ngx-swiper-wrapper';

import { COMPONENTS } from './components';
import { DIRECTIVES } from './directives';

const modules = [BrowserModule, ReactiveFormsModule, SwiperModule];

@NgModule({
	imports: [modules],
	exports: [modules, COMPONENTS, DIRECTIVES],
	declarations: [COMPONENTS, DIRECTIVES]
})
export class SharedModule { }
