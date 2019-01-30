import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({ selector: '[props]' })
export class PropsDirective<T = any> {
	_props: T;
	@Input() set props(props: T) {
		this._props = props;
		// set element attrs and such ...
		// this.hostElement.setAttribute
	}

	constructor(private host: ElementRef) {}

	get hostElement(): HTMLElement {
		return this.host.nativeElement;
	}
}
