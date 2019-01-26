import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { getAnswerLabel } from '@shared/logic';
import { Question, Answer, LabelType } from '@shared/types';

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
		<div class="question-description">
			<strong>{{description}}</strong>
		</div>
		<answer
			*ngFor="let answer of answers; let i = index;"
			[answer]="answer"
			[disabled]="isQuestionComplete"
			[selected]="isAnswerSelected(answer)"
			(click)="onAnswerClick(answer)"
		>
			<answer-label>{{getAnswerLabel(i)}}</answer-label>
		</answer>
	`,
})
export class SingleResponseQuestionComponent implements ControlValueAccessor {
	private _question: Question;
	private _value: number[] = [];

	get question() {
		return this._question;
	}
	@Input() set question(question: Question) {
		this._question = question;

		if (this.isQuestionComplete) {
			this.value = this.question.response.answerIds;
		}
	}

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
		if (value !== null) {
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
		if (this.isQuestionComplete) {
			return;
		}

		this.value = [answer.answerId];
	}

	get answers() {
		return (this.question && this.question.answers) || [];
	}

	get description() {
		return this.question && this.question.description;
	}

	get isQuestionComplete() {
		return this.question && this.question.response;
	}

	getAnswerLabel(answerIndex: number) {
		return getAnswerLabel({ answerIndex, labelType: LabelType.Alpha });
	}

	isAnswerSelected(answer: Answer) {
		return this.value.includes(answer.answerId);
	}
}
