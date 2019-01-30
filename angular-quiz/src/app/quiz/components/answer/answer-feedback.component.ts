import { Component, Input, HostBinding } from '@angular/core';

@Component({
	selector: 'answer-feedback',
	template: `<ng-content></ng-content>`,
	styles: [`
		:host {
			display: block;
			font-weight: bold;
		}

		:host.correct {
			color: var(--success-color);
		}

		:host.incorrect {
			color: var(--danger-color);
		}
	`]
})
export class AnswerFeedbackComponent {
	@HostBinding('class.correct') correctClass: boolean;
	@HostBinding('class.incorrect') incorrectClass: boolean;

	@Input() set correct(value: boolean) {
		this.correctClass = !!value;
		this.incorrectClass = !value;
	}
}
