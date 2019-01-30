import { Component, Input, HostBinding, OnChanges, ContentChild, TemplateRef } from '@angular/core';

import { Answer } from '@shared/types';

@Component({
	selector: 'answer',
	styles: [`
		:host {
			background-color: #fff;
			border: 2px solid #fff;
			border-radius: var(--cta-border-radius);
			box-shadow: var(--cta-box-shadow);
			color: var(--color-default);
			cursor: pointer;
			display: flex;
			flex-direction: column;
			justify-content: center;
			height: 80px;
			padding: 0 20px;
		}

		.answer-body {
			align-items: center;
			display: flex;
		}

		:host.disabled {
			cursor: default;
			border-color: var(--disabled-color);
		}

		:host.selected {
			border-color: var(--primary-color);
		}

		:host.incorrect {
			border-color: var(--danger-color);
		}

		:host.correct {
			border-color: var(--success-color);
		}

		.answer-label {
			font-size: 32px;
			margin-right: 20px;
		}

		:host.disabled .answer-label {
			color: var(--disabled-color);
		}

		:host.selected .answer-label {
			color: var(--primary-color);
		}

		:host.incorrect .answer-label {
			color: var(--danger-color);
		}

		:host.correct .answer-label {
			color: var(--success-color);
		}
	`],
	template: `
		<div class="answer-feedback">
			<ng-container *ngIf="isQuestionComplete">
				<ng-container *ngTemplateOutlet="template; context: context"></ng-container>
			</ng-container>
		</div>
		<div class="answer-body">
			<div class="answer-label">
				<strong>
					<ng-content select="answer-label"></ng-content>
				</strong>
			</div>
			<div class="answer-description">{{description}}</div>
		</div>
	`
})
export class AnswerComponent implements OnChanges {
	@ContentChild(TemplateRef) template: TemplateRef<any>;
	@Input() answer: Answer;
	@HostBinding('class.disabled') @Input() isQuestionComplete: boolean;
	@HostBinding('class.selected') @Input() selected: boolean;
	@HostBinding('class.correct') isCorrect: boolean;
	@HostBinding('class.incorrect') isIncorrect: boolean;

	ngOnChanges() {
		this.isCorrect = this.isQuestionComplete && this.answer.isCorrect;
		this.isIncorrect = this.isQuestionComplete && this.selected && !this.answer.isCorrect;
	}

	get description() {
		return this.answer && this.answer.description;
	}

	get context() {
		return {context: {
			selected: this.selected,
			isCorrect: this.answer.isCorrect
		}};
	}
}
