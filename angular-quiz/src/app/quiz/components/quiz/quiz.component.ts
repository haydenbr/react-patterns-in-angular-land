import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { isQuestionAnswered, checkQuestion, isQuizComplete, calculateQuizScore } from '@shared/logic';
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
			<question
				[formControl]="formControl"
				[question]="currentQuestion"
			></question>
			<div id="quiz-controls">
				<button
					*ngIf="hasPrevious"
					class="button primary back"
					(click)="goBack()"
				>
					Back
				</button>
				<button
					*ngIf="canGoNext"
					class="button primary next"
					(click)="goNext()"
				>
					Next
				</button>
				<button
					*ngIf="showConfirmAnswer"
					class="button primary next"
					[class.disabled]="!canConfirmAnswer"
					(click)="confirmAnswer()"
				>
					Confirm
				</button>
				<button
					*ngIf="isQuizComplete"
					class="button primary next"
					(click)="goToResults()"
				>
					See Results!
				</button>
			</div>
			<button (click)="debug()">debug</button>
		</ng-container>
		<ng-container *ngSwitchCase="${QuizStatus.Complete}">
			<div id="quiz-title">Results: {{title}}</div>
			<div>Your scored {{ score | number:'1.0-0' }}%</div>
			<h1 *ngIf="passedQuiz">Hooray you passed!</h1>
			<h1 *ngIf="!passedQuiz">Better luck next time, chump ...</h1>
			<button
				class="button primary"
				(click)="startOver()"
			>
				Start Over
			</button>
		</ng-container>
	</ng-container>
	`,
})
export class QuizComponent {
	_currentQuestionIndex = 0;
	quiz = demoQuiz;
	formControl = new FormControl();

	get currentQuestionIndex() {
		return this._currentQuestionIndex;
	}

	set currentQuestionIndex(index: number) {
		this._currentQuestionIndex = index;
		this.formControl = new FormControl();
	}

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

	get showConfirmAnswer() {
		return !this.canGoNext && !this.isQuizComplete;
	}

	get canConfirmAnswer() {
		let answers = this.selectedAnswers;
		return answers && answers.length && answers.length > 0;
	}

	get selectedAnswers() {
		return this.formControl.value;
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

	get isQuizComplete() {
		return isQuizComplete(this.quiz);
	}

	get passedQuiz() {
		return this.quiz.passed;
	}

	get score() {
		return this.quiz.score && this.quiz.score * 100;
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
		if (!this.canConfirmAnswer) {
			return;
		}

		let answeredQuestion = checkQuestion({ question: this.currentQuestion, answerIds: this.selectedAnswers});
		let questions = this.quiz.questions.map((q) => q.questionId === answeredQuestion.questionId ? answeredQuestion : q);
		this.quiz = { ...this.quiz, questions };

		if (this.isQuizComplete) {
			let score = calculateQuizScore(this.quiz);
			let passed = score > this.quiz.passingScore;
			this.quiz = { ...this.quiz, score, passed };
		}
	}

	goToResults() {
		if (this.isQuizComplete) {
			this.quizStatus = QuizStatus.Complete;
			console.log(calculateQuizScore(this.quiz));
		}
	}

	startOver() {
		this.quiz = demoQuiz;
		this.currentQuestionIndex = 0;
	}
}
