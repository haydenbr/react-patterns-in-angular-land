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
					[disabled]="context.isQuestionComplete"
					[selected]="context.isAnswerSelected(answer)"
					(click)="context.answerClick(answer, onAnswerChange)"
				>
					<answer-label>{{getAnswerLabel(i)}}</answer-label>
				</answer>
			</ng-template>
		</question>
	`,
})
export class MultipleResponseQuestionComponent {
	@Input() question: Question;
	@Input() onChange = (_: any) => {};
	stateReducer = multipleSelectQuestion;

	get onAnswerChange() {
		return ({ selectedAnswerIds }: QuestionState) => this.onChange(selectedAnswerIds);
	}

	getAnswerLabel(answerIndex: number) {
		return getAnswerLabel({ answerIndex, labelType: LabelType.Alpha });
	}
}
