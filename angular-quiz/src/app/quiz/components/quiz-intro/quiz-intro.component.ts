import { Component, Input, Output } from '@angular/core';

import { Quiz } from '@shared/types';
import { Subject } from 'rxjs';

@Component({
	selector: 'quiz-intro',
	styles: [`
		:host {
			display: block;
		}

		.quiz-title {
			color: black;
			font-weight: bold;
			font-size: 24px;
			margin-bottom: 10px;
		}

		.quiz-description {
			margin-bottom: 20px;
		}
	`],
	template: `
		<div class="quiz-title">{{title}}</div>
		<div class="quiz-description">{{description}}</div>
		<button
			class="button primary"
			(click)="onStartQuiz()"
		>
			Start Quiz
		</button>
	`
})
export class QuizIntroComponent {
	@Input() quiz: Quiz;
	@Output() startQuiz = new Subject();

	get title() {
		return this.quiz.title;
	}

	get description() {
		return this.quiz.description;
	}

	onStartQuiz() {
		this.startQuiz.next();
	}
}
