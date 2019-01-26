import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

import { Quiz } from '@shared/types';

@Component({
	selector: 'quiz-results',
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
	`],
	template: `
		<div class="quiz-title">Results: {{title}}</div>
		<div>Your scored {{ score | number: '1.0-0' }}%</div>
		<h1 *ngIf="passed">Hooray you passed!</h1>
		<h1 *ngIf="!passed">Better luck next time, chump ...</h1>
		<button
			class="button primary"
			(click)="onStartOver()"
		>
			Start Over
		</button>
	`
})
export class QuizResultsComponent {
	@Input() quiz: Quiz;
	@Output() startOver = new Subject();

	get passed() {
		return this.quiz.passed;
	}

	get score() {
		return this.quiz.score && this.quiz.score * 100;
	}

	onStartOver() {
		this.startOver.next();
	}
}
