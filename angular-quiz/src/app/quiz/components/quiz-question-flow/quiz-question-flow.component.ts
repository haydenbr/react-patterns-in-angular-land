import { Component, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

import { isQuizComplete, isQuestionAnswered } from '@shared/logic';
import { Quiz } from '@shared/types';

@Component({
	selector: 'quiz-question-flow',
	styles: [`
		:host {
			display: block;
		}

		#quiz-controls {
			clear: both;
		}

		#quiz-controls .back.button {
			float: left;
		}

		#quiz-controls .next.button {
			float: right;
		}
	`],
	template: `
		<single-response-question
			[formControl]="formControl"
			[question]="currentQuestion"
		></single-response-question>
		<div id="quiz-controls">
			<button
				*ngIf="hasPrevious"
				class="button primary back"
				(click)="clickBack()"
			>
				Back
			</button>
			<button
				*ngIf="canGoNext"
				class="button primary next"
				(click)="clickNext()"
			>
				Next
			</button>
			<button
				*ngIf="showConfirmAnswer"
				class="button primary next"
				[class.disabled]="!canConfirmAnswer"
				(click)="clickConfirmAnswer()"
			>
				Confirm
			</button>
			<button
				*ngIf="isQuizComplete"
				class="button primary next"
				(click)="clickSeeResults()"
			>
				See Results!
			</button>
		</div>
	`
})
export class QuizQuestionFlowComponent {
	private formControl = new FormControl();
	@Input() quiz: Quiz;
	private _currentQuestionIndex: number;
	get currentQuestionIndex() {
		return this._currentQuestionIndex;
	}
	@Input() set currentQuestionIndex(index: number) {
		this._currentQuestionIndex = index;
		this.formControl = new FormControl();
	}

	@Output() goBack = new Subject();
	@Output() goNext = new Subject();
	@Output() confirmAnswer = new Subject();
	@Output() goToResults = new Subject();

	clickBack() {
		this.goBack.next();
	}
	clickNext() {
		if (this.canGoNext) {
			this.goNext.next();
		}
	}
	clickConfirmAnswer() {
		if (this.canConfirmAnswer) {
			this.confirmAnswer.next(this.selectedAnswers);
		}
	}
	clickSeeResults() {
		if (this.isQuizComplete) {
			this.goToResults.next();
		}
	}

	get questions() {
		return this.quiz.questions;
	}

	get canConfirmAnswer() {
		let answers = this.selectedAnswers;
		return answers && answers.length && answers.length > 0;
	}

	get selectedAnswers() {
		return this.formControl.value;
	}

	get hasPrevious() {
		return this.currentQuestionIndex > 0;
	}

	get canGoNext() {
		return this.hasNext && this.isQuestionAnswered;
	}

	get showConfirmAnswer() {
		return !this.canGoNext && !this.isQuizComplete;
	}

	get hasNext() {
		return this.currentQuestionIndex < this.questions.length - 1;
	}

	get isQuizComplete() {
		return isQuizComplete(this.quiz);
	}

	get isQuestionAnswered() {
		return isQuestionAnswered(this.currentQuestion);
	}

	get currentQuestion() {
		return this.questions[this.currentQuestionIndex];
	}
}
