import { Component, forwardRef, Input, ContentChildren, QueryList } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Question } from '@shared/types';
import { CcAnswerComponent } from '../cc-answer/cc-answer.component';

@Component({
	selector: 'cc-question',
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => CcQuestionComponent),
		multi: true,
	}],
	styles: [`
		:host {
			display: block;
		}
	`],
	template: `
		<div id="question-description">{{description}}</div>
		<ng-content select="cc-answer"></ng-content>
	`,
})
export class CcQuestionComponent implements ControlValueAccessor {
	@Input() question: Question;
	@ContentChildren(CcAnswerComponent) answers = new QueryList<CcAnswerComponent>();

	private _value: number[] = [];
	onChange = (_: any) => {};
	onTouched = () => {};

	set value(value: number[]) {
		this._value = value;
		this.onChange(this.value);
	}

	get value() {
		return this._value;
	}

	registerOnChange(onChange: any) {
		this.onChange = onChange;
	}

	writeValue(value: number[]) {
		if (value) {
			this.value = value;
		}
	}

	registerOnTouched(onTouched: any) {
		this.onTouched = onTouched;
	}

	get description() {
		return this.question.description;
	}
}
