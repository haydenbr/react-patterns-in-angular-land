import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

const modules = [BrowserModule, ReactiveFormsModule];

@NgModule({
	imports: [modules],
	exports: [modules],
})
export class SharedModule { }
