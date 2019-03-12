import { Component, Input, ContentChild, TemplateRef } from '@angular/core';

import { Question, Answer, QuestionStateChange, QuestionState, QuestionStateReducer } from '@shared/types';

@Component({
	selector: 'question',
	template: `
		<ng-container *ngTemplateOutlet="template; context: context"></ng-container>
	`,
})
export class QuestionComponent {
	private _question: Question;
	// why isn't question in state? :)
	private state: QuestionState = {
		selectedAnswerIds: []
	};

	@Input() stateReducer: QuestionStateReducer = (state, changes) => changes;

	@ContentChild(TemplateRef) template: TemplateRef<any>;

	@Input() set question(question: Question) {
		this._question = question;

		if (this.isQuestionComplete) {
			this.state.selectedAnswerIds = this.question.response.answerIds;
		} else {
			this.state.selectedAnswerIds = [];
		}
	}
	get question() {
		return this._question;
	}

	// why am I doing bind here? :)
	get context() { // yo dawg ...
		return {context: {
			answerClick: this.answerClick.bind(this),
			isAnswerSelected: this.isAnswerSelected.bind(this),
			isQuestionComplete: this.isQuestionComplete,
		}};
	}

	answerClick(answer: Answer, callback = (_: any) => {}) {
		this.internalSetState((state: QuestionState) => {
			if (this.isQuestionComplete) {
				return state;
			} else {
				return {
					type: QuestionStateChange.SelectAnswer,
					selectedAnswerIds: [answer.answerId]
				};
			}
		}, callback);
	}

	isAnswerSelected(answer: Answer) {
		const currentAnswers = this.state.selectedAnswerIds;
		return currentAnswers.includes(answer.answerId);
	}

	// why isn't this in state? :)
	get isQuestionComplete() {
		return this.question && this.question.response !== undefined;
	}

	private internalSetState(changes: any, callback = (_: any) => {}) {
		const currentState = this.state;
		const changesResult = changes(currentState);
		const { type, ...newState } = this.stateReducer(currentState, changesResult);
		this.state = {...currentState, ...newState};
		callback(this.state);
	}
}
