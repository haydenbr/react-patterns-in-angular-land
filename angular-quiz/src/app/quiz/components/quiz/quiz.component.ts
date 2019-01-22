import { Component, Input } from '@angular/core';
import { Quiz, QuizStatus } from '@shared/types';

@Component({
	selector: 'quiz',
	styles: [`
		:host {
			border: 1px solid black;
			display: block;
			min-height: 600px;
			padding: 10px;
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
	`],
	template: `
	<ng-container [ngSwitch]="quizStatus">
		<ng-container *ngSwitchCase="${QuizStatus.Intro}">
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
		</ng-container>
		<ng-container *ngSwitchCase="${QuizStatus.Complete}">
		</ng-container>
	</ng-container>
	`,
})
export class QuizComponent {
	@Input() quiz: Quiz;
	currentQuestionIndex = 0;
	quizStatus = QuizStatus.Intro;

	get title() {
		return this.quiz && this.quiz.description;
	}

	get description() {
		return this.quiz && this.quiz.description;
	}

	startQuiz() {
		if (this.quizStatus === QuizStatus.Intro) {
			this.quizStatus = QuizStatus.InProgress;
		}
	}

	get currentQuestion() {
		return this.quiz && this.quiz.questions[this.currentQuestionIndex];
	}

	get answers() {
		return this.currentQuestion && this.currentQuestion.answers;
	}
}
