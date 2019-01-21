import { Component, forwardRef, Input, ContentChildren, QueryList } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Question } from '@shared/types';
import { AnswerComponent } from '../answer/answer.component';

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

		#question-description {
			margin-bottom: 10px;
		}

		#answer-container {
			border: 1px solid black;
			padding: 10px;
			max-width: 800px;
		}

		answer {
			margin-bottom: 10px;
		}
	`],
	template: `

	`,
})
export class QuestionComponent {}
