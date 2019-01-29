import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Question, QuestionState, Answer } from '@shared/types';

@Component({
	selector: 'true-false-question',
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => TrueFalseQuestionComponent),
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
export class TrueFalseQuestionComponent implements ControlValueAccessor {
	@Input() question: Question;

	get onAnswerChange() {
		return ({ selectedAnswerIds }: QuestionState) => this.onChange(selectedAnswerIds);
	}

	onChange = (_: any) => {};
	onTouched = () => {};

	writeValue(initialValue) {}
	registerOnChange(onChange: any) {
		this.onChange = onChange;
	}
	registerOnTouched(onTouched: any) {
		this.onTouched = onTouched;
	}

	getAnswerLabel(answer: Answer) {
		if (answer.isTrue) {
			return 'True';
		} else {
			return 'False';
		}
	}
}
