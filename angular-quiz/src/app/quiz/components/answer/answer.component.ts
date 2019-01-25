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

		:host.disabled {
			cursor: default;
			border-color: var(--disabled-color);
		}

		:host.selected {
			border-color: var(--primary-color);
		}

		.answer-label {
			font-size: 32px;
			margin-right: 20px;
		}

		.disabled.answer-label {
			color: var(--disabled-color);
		}

		.selected.answer-label {
			color: var(--primary-color);
		}
	`],
	template: `
		<div
			class="answer-label"
			[class.selected]="selected"
			[class.disabled]="disabled"
		>
			<strong>{{label}}</strong>
		</div>
		<div class="answer-description">{{description}}</div>
	`
})
export class AnswerComponent {
	@Input() answer: Answer;
	@Input() index: number;
	@HostBinding('class.disabled') @Input() disabled: boolean;
	@HostBinding('class.selected') @Input() selected: boolean;

	get description() {
		return this.answer && this.answer.description;
	}

	get label() {
		return getAnswerLabel({ answerIndex: this.index, labelType: LabelType.Alpha });
	}
}
