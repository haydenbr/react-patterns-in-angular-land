import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

// sometimes the remedy is worse than the disease
// if you only needed to provide one reactive form interface,
// then this could be a lot cleaner. Having to handle more
// than one case though, like both direct formControl as well
// as formControlName in a formGroup, makes things really
// messy as you can't conditionally apply these directives

@Component({
	selector: 'foo-form-control',
	template: `
		<control-value-accessor
			*ngIf="formControl"
			[formControl]="formControl"
		>
			<ng-template let-context="context">
				<ng-container *ngTemplateOutlet="template; context: { context: context }"></ng-container>
			</ng-template>
		</control-value-accessor>

		<form
			*ngIf="formGroup && formControlName"
			[formGroup]="formGroup"
		>
			<control-value-accessor
				[formControlName]="formControlName"
			>
				<ng-template let-context="context">
					<ng-container *ngTemplateOutlet="template; context: { context: context }"></ng-container>
				</ng-template>
			</control-value-accessor>
		</form>

		<ng-template #template let-context="context">
			<button (click)="context.onChange(1)">1</button>
			<button (click)="context.onChange(2)">2</button>
			<button (click)="context.onChange(3)">3</button>
			<button (click)="context.onChange(4)">4</button>
			<button (click)="context.onChange(5)">5</button>
		</ng-template>
	`
})
export class FooFormControlComponent {
	@Input('name') formControlName: string;
	@Input('control') formControl: FormControl;
	@Input() formGroup: FormGroup;
}
