import { Component } from '@angular/core';

@Component({
	selector: 'image-card-caption',
	template: `<ng-content></ng-content>`,
	styles: [`
		:host { display: block; }
	`]
})
export class ImageCardCaptionComponent {}
