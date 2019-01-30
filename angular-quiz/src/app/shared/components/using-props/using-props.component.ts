import { Component, Host, Optional, OnInit } from '@angular/core';

import { PropsDirective } from '@quiz/shared/directives';

interface FooProps {
	name: string;
	id: number;
	message: string;
	config: any;
}

@Component({
	selector: 'using-props',
	template: `
	<h2>hello, my name is {{props.name}}, <i>{{props.id}}</i></h2>
	<p>{{props.message}}</p>
	`
})
export class UsingPropsComponent {
	constructor(@Optional() @Host() private _props: PropsDirective<FooProps>) {}

	get props() {
		return this._props._props;
	}
}
