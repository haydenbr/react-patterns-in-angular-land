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
					[disabled]="context.isQuestionComplete"
					[selected]="context.isAnswerSelected(answer)"
					(click)="context.answerClick(answer, onAnswerChange)"
				>
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
}
