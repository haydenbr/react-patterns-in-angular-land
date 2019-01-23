import { Component, Input, HostBinding } from '@angular/core';

import { getAnswerLabel } from '@shared/logic';
import { Answer, LabelType } from '@shared/types';

@Component({
	selector: 'answer',
	styles: [`
		:host {
			align-items: center;
			background-color: #fff;
			border: 2px solid #fff;
			border-radius: var(--cta-border-radius);
			box-shadow: var(--cta-box-shadow);
			cursor: pointer;
			display: flex;
			padding: 20px;
		}

		:host.selected {
			border-color: var(--primary-color);
		}

		.answer-label {
			font-size: 32px;
			margin-right: 20px;
		}

		.selected.answer-label {
			color: var(--primary-color);
		}
	`],
	template: `
		<div class="answer-label" [class.selected]="selected">
			<strong>{{label}}</strong>
		</div>
		<div class="answer-description">{{description}}</div>
	`
})
export class AnswerComponent {
	@Input() answer: Answer;
	@Input() index: number;
	@HostBinding('class.selected') @Input() selected: boolean;

	get description() {
		return this.answer && this.answer.description;
	}

	get label() {
		return getAnswerLabel({ answerIndex: this.index, labelType: LabelType.Alpha });
	}
}
