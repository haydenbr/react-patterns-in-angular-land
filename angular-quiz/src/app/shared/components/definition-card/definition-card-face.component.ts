import { Component } from '@angular/core';

@Component({
	selector: 'definition-card-front, definition-card-back',
	template: `<ng-content></ng-content>`,
	styles: [`
		:host { display: block; }
	`]
})
export class DefinitionCardFaceComponent {}
