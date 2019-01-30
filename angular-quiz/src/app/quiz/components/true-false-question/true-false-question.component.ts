import { Component, Input } from '@angular/core';

import { Question, QuestionState, Answer } from '@shared/types';

@Component({
	selector: 'true-false-question',
	styles: [`
		:host {
			display: block;
		}

		.question-description {
			margin-bottom: 10px;
		}

		answer {
			margin-bottom: 20px;
		}
	`],
	template: `
		<question [question]="question">
			<ng-template let-context="context">
				<div class="question-description">
					<strong>{{question.description}}</strong>
				</div>
				<answer
					*ngFor="let answer of question.answers; let i = index;"
					[answer]="answer"
					[isQuestionComplete]="context.isQuestionComplete"
					[selected]="context.isAnswerSelected(answer)"
					(click)="context.answerClick(answer, onAnswerChange)"
				>
					<ng-template let-context="context">
						<answer-feedback [correct]="context.isCorrect">
							{{getAnswerFeedback(answer)}}
						</answer-feedback>
					</ng-template>
					<answer-label>{{getAnswerLabel(answer)}}</answer-label>
				</answer>
			</ng-template>
		</question>
	`,
})
export class TrueFalseQuestionComponent {
	@Input() question: Question;
	@Input() onChange = (_: any) => {};

	get onAnswerChange() {
		return ({ selectedAnswerIds }: QuestionState) => this.onChange(selectedAnswerIds);
	}

	getAnswerLabel(answer: Answer) {
		if (answer.isTrue) {
			return 'True';
		} else {
			return 'False';
		}
	}

	getAnswerFeedback(answer: Answer) {
		if (answer.isCorrect) {
			return `The statement is ${answer.isTrue ? 'True' : 'False'}`;
		} else {
			return 'You\'ve answered incorrectly';
		}
	}
}
