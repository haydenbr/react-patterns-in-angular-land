import { Component, forwardRef, ContentChild, TemplateRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// If this is the first time you're seeing Control Value Accessor,
// it's pretty snazzy. You can read more about it here
// https://angular.io/api/forms/ControlValueAccessor

@Component({
	selector: 'control-value-accessor',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => ControlValueAccessorComponent),
			multi: true,
		}
	],
	template: `
		<ng-container *ngTemplateOutlet="template; context: context"></ng-container>
	`,
})
export class ControlValueAccessorComponent implements ControlValueAccessor {
	@Input() setDisabledState = (isDisabled: boolean) => {};
	@ContentChild(TemplateRef) template: TemplateRef<any>;
	onChange = (_: any) => {};
	onTouched = () => {};

	writeValue = (value: any) => {
		if (value) {
			this.onChange(value);
		}
	}
	registerOnChange = (onChange: any) => this.onChange = onChange;
	registerOnTouched = (onTouched: any) => this.onTouched = onTouched;

	get context() {
		return {context: {
			onChange: this.onChange,
			onTouched: this.onTouched
		}};
	}
}
