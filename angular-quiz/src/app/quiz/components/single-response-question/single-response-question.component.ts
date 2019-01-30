import { Component, Input } from '@angular/core';

import { getAnswerLabel } from '@shared/logic';
import { Question, LabelType, QuestionState,  } from '@shared/types';

@Component({
	selector: 'single-response-question',
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

		answer-feedback.correct {
			color: var(--success-color);
		}

		answer-feedback.incorrect {
			color: var(--danger-danger);
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
							{{getAnswerFeedback(context.selected, context.isCorrect)}}
						</answer-feedback>
					</ng-template>
					<answer-label>{{getAnswerLabel(i)}}</answer-label>
				</answer>
			</ng-template>
		</question>
	`,
})
export class SingleResponseQuestionComponent {
	@Input() question: Question;
	@Input() labelType: LabelType;
	@Input() onChange = (_: any) => {};

	get onAnswerChange() {
		return ({ selectedAnswerIds }: QuestionState) => this.onChange(selectedAnswerIds);
	}

	getAnswerLabel(answerIndex: number) {
		return getAnswerLabel({ answerIndex, labelType: this.labelType }) || 'O';
	}

	getAnswerFeedback(selected: boolean, isCorrect: boolean) {
		if (selected && isCorrect) {
			return 'Good job, you selected the correct answer!';
		} else if (!selected && isCorrect) {
			return 'This was the right answer and you missed it.';
		} else if (selected && !isCorrect) {
			return 'You picked this answer but you\'re WRONG!';
		}
	}
}
