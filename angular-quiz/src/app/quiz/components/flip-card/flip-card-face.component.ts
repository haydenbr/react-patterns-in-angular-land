import { Component } from '@angular/core';

@Component({
	selector: 'flip-card-front, flip-card-back',
	template: `<ng-content></ng-content>`,
	styles: [`
		:host {
			display: block;
			padding: var(--flip-card-padding, 10px);
		}
	`]
})
export class FlipCardFaceComponent {}
