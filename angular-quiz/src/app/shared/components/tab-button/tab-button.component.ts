import { Component, Input, HostListener, Output, ElementRef } from '@angular/core';
import { TweenConfig } from 'gsap';
import { Subject } from 'rxjs';

import { animateDeselection, animateSelection } from './tab-button.animation';

@Component({
	selector: 'tab-button',
	styles: [`
		:host {
			background-color: var(--primary-color);
			border-radius: 0 var(--cta-border-radius) var(--cta-border-radius) 0;
			box-shadow: var(--cta-box-shadow);
			color: #fff;
			cursor: pointer;
			display: flex;
			font-size: 28px;
			height: 100px;
			justify-content: flex-end;
			margin-bottom: 5px;
			padding: 10px;
			position: relative;
			width: 400px;
		}

		#tab-title {
			display: flex;
			flex-direction: column;
			height: 100%;
			justify-content: center;
			width: 250px;
		}
	`],
	template: `
		<div id="tab-title">
			<ng-content></ng-content>
		</div>
	`,
})
export class TabButtonComponent {
	@Input() value: string;
	@HostListener('click') onHostClick = () => this.tabSelect.next();
	@Output() tabSelect = new Subject<TabButtonComponent>();

	constructor(private readonly elementRef: ElementRef) {}

	get nativeElement() {
		return this.elementRef.nativeElement;
	}

	animateSelection(config: TweenConfig = {}) {
		return animateSelection(this.nativeElement, config);
	}

	animateDeselection(config: TweenConfig = {}) {
		return animateDeselection(this.nativeElement, config);
	}
}
