import { Component } from '@angular/core';

import { checkQuestion, isQuizComplete, calculateQuizScore } from '@shared/logic';
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
	`],
	template: `
	<ng-container [ngSwitch]="quizStatus">
		<ng-container *ngSwitchCase="${QuizStatus.NotStarted}">
			<quiz-intro
				[quiz]="quiz"
				(startQuiz)="startQuiz()"
			></quiz-intro>
		</ng-container>
		<ng-container *ngSwitchCase="${QuizStatus.InProgress}">
			<quiz-question-flow
				[quiz]="quiz"
				[currentQuestionIndex]="currentQuestionIndex"
				(goBack)="goBack()"
				(goNext)="goNext()"
				(confirmAnswer)="confirmAnswer($event)"
				(goToResults)="goToResults()"
			></quiz-question-flow>
		</ng-container>
		<ng-container *ngSwitchCase="${QuizStatus.Complete}">
			<quiz-results
				[quiz]="quiz"
				(startOver)="startOver()"
			></quiz-results>
		</ng-container>
	</ng-container>
	`,
})
export class QuizComponent {
	currentQuestionIndex = 0;
	quiz = demoQuiz;

	get quizStatus() {
		return this.quiz && this.quiz.status;
	}
	set quizStatus(status: QuizStatus) {
		this.quiz = { ...this.quiz, status };
	}

	get currentQuestion() {
		return this.questions[this.currentQuestionIndex];
	}

	get questions() {
		return (this.quiz && this.quiz.questions) || [];
	}

	get isQuizComplete() {
		return isQuizComplete(this.quiz);
	}

	startQuiz() {
		this.quizStatus = QuizStatus.InProgress;
	}

	goBack() {
		this.currentQuestionIndex = this.currentQuestionIndex - 1;
	}

	goNext() {
		this.currentQuestionIndex = this.currentQuestionIndex + 1;
	}

	confirmAnswer(selectedAnswers: number[]) {
		let answeredQuestion = checkQuestion({
			question: this.currentQuestion,
			answerIds: selectedAnswers
		});
		let questions = this.questions.map((q) => q.questionId === answeredQuestion.questionId ? answeredQuestion : q);
		this.quiz = { ...this.quiz, questions };

		if (this.isQuizComplete) {
			let score = calculateQuizScore(this.quiz);
			let passed = score > this.quiz.passingScore;
			this.quiz = { ...this.quiz, score, passed };
		}
	}

	goToResults() {
		this.quizStatus = QuizStatus.Complete;
	}

	startOver() {
		this.quiz = demoQuiz;
		this.currentQuestionIndex = 0;
	}
}
