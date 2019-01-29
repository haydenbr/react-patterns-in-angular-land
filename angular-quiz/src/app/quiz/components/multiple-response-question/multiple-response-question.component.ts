import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { getAnswerLabel, multipleSelectQuestion } from '@shared/logic';
import { Question, LabelType, QuestionState } from '@shared/types';

@Component({
	selector: 'multiple-response-question',
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => MultipleResponseQuestionComponent),
		multi: true,
	}],
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
export class MultipleResponseQuestionComponent implements ControlValueAccessor {
	@Input() question: Question;
	stateReducer = multipleSelectQuestion;

	get onAnswerChange() {
		return ({ selectedAnswerIds }: QuestionState) => this.onChange(selectedAnswerIds);
	}

	onChange = (_: any) => {};
	onTouched = () => {};

	writeValue() {}
	registerOnChange(onChange: any) {
		this.onChange = onChange;
	}
	registerOnTouched(onTouched: any) {
		this.onTouched = onTouched;
	}

	getAnswerLabel(answerIndex: number) {
		return getAnswerLabel({ answerIndex, labelType: LabelType.Alpha });
	}
}
