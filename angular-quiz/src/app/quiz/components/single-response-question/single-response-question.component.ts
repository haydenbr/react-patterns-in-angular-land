import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { getAnswerLabel } from '@shared/logic';
import { Question, LabelType } from '@shared/types';
import { QuestionState } from '../question/question.component';

@Component({
	selector: 'single-response-question',
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => SingleResponseQuestionComponent),
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
export class SingleResponseQuestionComponent implements ControlValueAccessor {
	private _question: Question;
	initialValue: any;

	get question() {
		return this._question;
	}
	@Input() set question(question: Question) {
		this._question = question;
	}

	get onAnswerChange() {
		return ({ selectedAnswerIds }: QuestionState) => this.onChange(selectedAnswerIds);
	}

	onChange = (_: any) => {};
	onTouched = () => {};

	writeValue(initialValue) {
		if (initialValue !== null) {
			/*
				This method is called only when the component is initialized and the associated form control, NgModel, etc, has an initial value, like in the case of `new FormControl(initialValue)`. So this is where you would decide what to do with that. However, the <question> component knows how to rehydrate itself. When the question is set, it checks to see if the current question already has a selected value, and calls onChange. So we've handled the initialValue case, but internally so that the consuming component doesn't have to be responsible. Is this the right way to handle it? Maybe, mabye not. It seems nice that the consuming component, in this case quiz-question-flow, doesn't have to worry about checking for existing values and such, but then again, it might not be the API that users would expect. But maybe it doesn't make a huge difference either way.
			*/
		}
	}
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
