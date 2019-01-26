import { Component, forwardRef, ContentChild, TemplateRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
	@ContentChild(TemplateRef) template: TemplateRef<any>;
	onChange = (_: any) => {};
	onTouched = () => {};

	writeValue(value: any) {
		if (value) {
			this.onChange(value);
		}
	}

	registerOnChange(onChange: any) {
		this.onChange = onChange;
	}

	registerOnTouched(onTouched: any) {
		this.onTouched = onTouched;
	}

	get context() {
		return { context: { onChange: this.onChange } };
	}
}
