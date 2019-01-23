import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { isQuestionAnswered } from '@shared/logic';
import { QuizStatus } from '@shared/types';
import { demoQuiz } from '@shared/demo-quiz';

@Component({
	selector: 'quiz',
	styles: [`
		:host {
			background-color: #fff;
			box-shadow: inset 0 0 2px rgba(0,0,0,0.5);
			display: block;
			min-height: 600px;
			padding: 20px;
			max-width: 900px;
		}

		#quiz-title {
			color: black;
			font-weight: bold;
			font-size: 24px;
			margin-bottom: 10px;
		}

		#quiz-description {
			margin-bottom: 20px;
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
	<ng-container [ngSwitch]="quizStatus">
		<ng-container *ngSwitchCase="${QuizStatus.NotStarted}">
			<div id="quiz-title">{{title}}</div>
			<div id="quiz-description">{{description}}</div>
			<button
				class="button primary"
				(click)="startQuiz()"
			>
				Start Quiz
			</button>
		</ng-container>
		<ng-container *ngSwitchCase="${QuizStatus.InProgress}">
			<form [formGroup]="formGroup">
				<question
					[formControlName]="currentQuestionId"
					[question]="currentQuestion"
				></question>
			</form>
			<div id="quiz-controls">
				<button
					*ngIf="hasPrevious"
					class="button primary back"
					(click)="goBack()"
				>
					Back
				</button>
				<button
					*ngIf="!canGoNext"
					class="button primary next"
					(click)="confirmAnswer()"
				>
					Confirm
				</button>
				<button
					*ngIf="canGoNext"
					class="button primary next"
					(click)="goNext()"
				>
					Next
				</button>
			</div>
		</ng-container>
		<ng-container *ngSwitchCase="${QuizStatus.Complete}">
		</ng-container>
	</ng-container>
	`,
})
export class QuizComponent {
	currentQuestionIndex = 0;
	quiz = demoQuiz;
	formGroup = new FormBuilder().group(
		this.questions.reduce((config, q) => ({ ...config, [q.questionId]: [undefined, Validators.required] }), {})
	);

	get quizStatus() {
		return this.quiz && this.quiz.status;
	}

	set quizStatus(status: QuizStatus) {
		this.quiz = { ...this.quiz, status };
	}

	get title() {
		return this.quiz && this.quiz.description;
	}

	get description() {
		return this.quiz && this.quiz.description;
	}

	get currentQuestionId() {
		return this.currentQuestion.questionId;
	}

	get currentQuestion() {
		return this.questions[this.currentQuestionIndex];
	}

	get questions() {
		return (this.quiz && this.quiz.questions) || [];
	}

	get canGoNext() {
		return this.hasNext && this.isQuestionAnswered;
	}

	get isQuestionAnswered() {
		return isQuestionAnswered(this.currentQuestion);
	}

	get hasPrevious() {
		return this.currentQuestionIndex > 0;
	}

	get hasNext() {
		return this.currentQuestionIndex < this.questions.length - 1;
	}

	startQuiz() {
		if (this.quizStatus === QuizStatus.NotStarted) {
			this.quizStatus = QuizStatus.InProgress;
		}
	}

	goBack() {
		if (this.hasPrevious) {
			this.currentQuestionIndex = this.currentQuestionIndex - 1;
		}
	}

	goNext() {
		if (this.canGoNext) {
			this.currentQuestionIndex = this.currentQuestionIndex + 1;
		}
	}

	confirmAnswer() {

	}
}
