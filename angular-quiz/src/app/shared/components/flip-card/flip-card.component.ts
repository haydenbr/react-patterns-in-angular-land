import { Component, ElementRef } from '@angular/core';
import { Animation } from 'gsap';
import { animateFlipCardToBack, animateFlipCardToFront } from './flip-card.animation';

@Component({
	selector: 'flip-card',
	styleUrls: ['flip-card.component.css'],
	template: `
	<div
		class="front-face card-face"
		(click)="flipCardToBack()"
	>
		<ng-content select="flip-card-front"></ng-content>
	</div>
	<div
		class="back-face card-face"
		(click)="flipCardToFront()"
	>
		<ng-content select="flip-card-back"></ng-content>
	</div>`
})
export class FlipCardComponent {
	private cardAnimating = false;

	private get elem(): HTMLElement {
		return this._elem.nativeElement;
	}

	constructor(private _elem: ElementRef) {}

	flipCardToBack() {
		this.doAnimation(animateFlipCardToBack);
	}

	flipCardToFront() {
		this.doAnimation(animateFlipCardToFront);
	}

	private doAnimation(animationFunction: (elem: HTMLElement) => Animation) {
		if (!this.cardAnimating) {
			this.cardAnimating = true;
			animationFunction(this.elem).eventCallback('onComplete', () => {
				this.cardAnimating = false;
			});
		}
	}
}
