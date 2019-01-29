import { Component, Input, ContentChild, TemplateRef } from '@angular/core';

import { Question, Answer } from '@shared/types';

export interface QuestionState {
	selectedAnswerIds: number[];
}

export type QuestionStateReducer = (
	state: QuestionState,
	changes: QuestionState & { type: string }
) => QuestionState & { type: string };

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

	get context() { // yo dawg ...
		return {context: {
			answerClick: this.answerClick,
			isAnswerSelected: this.isAnswerSelected,
			isQuestionComplete: this.isQuestionComplete,
		}};
	}

	// Why is this a getter? :)
	get answerClick() {
		return (answer: Answer, callback = (_: any) => {}) => {
			this.internalSetState((state: QuestionState) => {
				if (this.isQuestionComplete) {
					return state;
				} else {
					return {
						type: 'selectedAnswer',
						selectedAnswerIds: [answer.answerId]
					};
				}
			}, callback);
		};
	}

	// and this? :)
	get isAnswerSelected() {
		return (answer: Answer) => {
			const currentAnswers = this.state.selectedAnswerIds;
			return currentAnswers.includes(answer.answerId);
		};
	}

	// why isn't this in state?
	get isQuestionComplete() {
		return this.question && this.question.response !== undefined;
	}

	private internalSetState(changes: any, callback = (_: any) => {}) {
		const currentState = this.state;
		const changesObject =
			typeof changes === 'function' ? changes(currentState) : changes;
		const { type, ...newState } = this.stateReducer(currentState, changesObject);
		this.state = newState;
		callback(this.state);
	}
}
