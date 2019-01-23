import { AfterViewInit, Component, OnDestroy, ContentChildren, QueryList, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TimelineLite } from 'gsap';
import { Subject } from 'rxjs';
import { takeUntil, startWith } from 'rxjs/operators';

import { TabButtonComponent } from '../tab-button/tab-button.component';

@Component({
	selector: 'tab-button-group',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TabButtonGroupComponent),
			multi: true,
		},
	],
	styles: [`
		:host { display: block; }
	`],
	template: `<ng-content select="tab-button"></ng-content>`,
})
export class TabButtonGroupComponent implements AfterViewInit, OnDestroy, ControlValueAccessor {
	@ContentChildren(TabButtonComponent) private tabs = new QueryList<TabButtonComponent>();
	onChange = (_: any) => {};
	onTouched = () => {};
	private killSubscriptions = new Subject();
	private _value: string;

	writeValue(value: any) {
		if (value) {
			this.value = value;
		}
	}
	registerOnChange(onChange: any) {
		this.onChange = onChange;
	}
	registerOnTouched(onTouched: any) {
		this.onTouched = onTouched;
	}

	get value() {
		return this._value;
	}
	set value(value) {
		this._value = value;
		this.onChange(this._value);
	}
	get selectedTab() {
		return this.tabs.find((tab) => tab.value === this.value);
	}

	ngAfterViewInit() {
		this.animateTabStyles();
		this.initTabSelectSubsctiptions();
	}

	private initTabSelectSubsctiptions() {
		this.tabs.forEach((tab) =>
			tab.tabSelect.pipe(
				takeUntil(this.killSubscriptions)
			).subscribe(() => {
				if (tab.value === this.value) {
					return;
				}

				this.value = tab.value;
				this.animateTabStyles();
			})
		);
	}

	private animateTabStyles() {
		let timeline = new TimelineLite()
			.add(this.tabs.map((tab) => tab.animateDeselection()), 'start');

		if (this.selectedTab) {
			timeline = timeline.add(this.selectedTab.animateSelection(), 'start');
		}

		return timeline;
	}

	ngOnDestroy() {
		this.killSubscriptions.next();
	}
}
