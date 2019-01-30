import { Component, Input } from '@angular/core';

import { getAnswerLabel, multipleSelectQuestion } from '@shared/logic';
import { Question, LabelType, QuestionState } from '@shared/types';

@Component({
	selector: 'multiple-response-question',
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
		<question
			[question]="question"
			[stateReducer]="stateReducer"
		>
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
						<answer-feedback
							[correct]="context.selected && context.isCorrect"
						>
							{{getAnswerFeedback(context.selected, context.isCorrect)}}
						</answer-feedback>
					</ng-template>
					<answer-label>{{getAnswerLabel(i)}}</answer-label>
				</answer>
			</ng-template>
		</question>
	`,
})
export class MultipleResponseQuestionComponent {
	@Input() question: Question;
	@Input() labelType: LabelType;
	@Input() onChange = (_: any) => {};
	stateReducer = multipleSelectQuestion;

	get onAnswerChange() {
		return ({ selectedAnswerIds }: QuestionState) => this.onChange(selectedAnswerIds);
	}

	getAnswerLabel(answerIndex: number) {
		return getAnswerLabel({ answerIndex, labelType: this.labelType }) || 'X';
	}

	getAnswerFeedback(selected: boolean, isCorrect: boolean) {
		if (selected && isCorrect) {
			return 'This was one of the correct answers and you picked it!';
		} else if (!selected && isCorrect) {
			return 'This was one of the correct answers but you missed it.';
		} else if (selected && !isCorrect) {
			return 'You picked this answer but it\'s not one of the correct answers';
		}
	}
}
