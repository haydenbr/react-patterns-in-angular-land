import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Question, Answer } from '@shared/types';

@Component({
	selector: 'question',
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => QuestionComponent),
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
		<div class="question-description">
			<strong>{{description}}</strong>
		</div>
		<answer
			*ngFor="let answer of answers; let i = index;"
			[answer]="answer"
			[index]="i"
			[selected]="isAnswerSelected(answer)"
			(click)="onAnswerClick(answer)"
		></answer>
	`,
})
export class QuestionComponent implements ControlValueAccessor {
	@Input() question: Question;

	private _value: number[] = [];
	private get value() {
		return this._value || [];
	}
	private set value(value: number[]) {
		this._value = value;
		this.onChange(this.value);
	}

	onChange = (_: any) => {};
	onTouched = () => {};

	writeValue(value) {
		if (value !== undefined) {
			this.value = value;
		}
	}
	registerOnChange(onChange: any) {
		this.onChange = onChange;
	}
	registerOnTouched(onTouched: any) {
		this.onTouched = onTouched;
	}

	onAnswerClick(answer: Answer) {
		this.value = [answer.answerId];
	}

	get answers() {
		return (this.question && this.question.answers) || [];
	}

	get description() {
		return this.question && this.question.description;
	}

	isAnswerSelected(answer: Answer) {
		return this.value.includes(answer.answerId);
	}
}
