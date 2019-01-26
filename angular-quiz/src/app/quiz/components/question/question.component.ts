import { Component, Input, ContentChild, TemplateRef } from '@angular/core';

import { Question, Answer } from '@shared/types';

@Component({
	selector: 'question',
	template: `
		<ng-container *ngTemplateOutlet="template; context: context"></ng-container>
	`,
})
export class QuestionComponent {
	private selectedAnswerIds: number[] = [];
	private _question: Question;
	@ContentChild(TemplateRef) template: TemplateRef<any>;
	@Input() onChange = (_: any) => {};
	@Input() set question(question: Question) {
		this._question = question;

		if (this.isQuestionComplete) {
			this.selectedAnswerIds = this.question.response.answerIds;
		} else {
			this.selectedAnswerIds = [];
		}
	}
	get question() {
		return this._question;
	}

	get context() {
		return {context: {
			answerClick: this.answerClick.bind(this),
			isAnswerSelected: this.isAnswerSelected.bind(this),
			isQuestionComplete: this.isQuestionComplete,
		}};
	}

	answerClick(answer: Answer) {
		if (this.isQuestionComplete) {
			return;
		}

		this.selectedAnswerIds = [answer.answerId];
		this.onChange(this.selectedAnswerIds);
	}

	isAnswerSelected(answer: Answer) {
		return this.selectedAnswerIds.includes(answer.answerId);
	}

	get isQuestionComplete() {
		return this.question && this.question.response !== undefined;
	}
}
