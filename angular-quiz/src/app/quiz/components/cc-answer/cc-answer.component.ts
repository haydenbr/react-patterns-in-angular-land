import { Component, Input, ChangeDetectorRef, HostListener } from '@angular/core';
import { Subject } from 'rxjs';

import { Answer, Question } from '@shared/types';

@Component({
	selector: 'cc-answer',
	styles: [`
		:host {
			border: 2px solid var(--default-color);
			border-radius: var(--cta-border-radius);
			display: flex;
			justify-content: center;
		}
	`],
	template: `
		<div id="label"></div>
		<div class="answer-description">{{description}}</div>
	`
})
export class CcAnswerComponent {
	@Input() question: Question;
	@Input() answer: Answer;

	private _selected: boolean;
	set selected(selected: boolean) {
		this._selected = selected;
		this.cd.markForCheck();
	}
	get selected() {
		return this._selected;
	}

	answerClick$ = new Subject();
	@HostListener('click') onAnswerClick = () => this.answerClick$.next();

	constructor(private cd: ChangeDetectorRef) {}

	get description() {
		return this.answer.description;
	}
}
