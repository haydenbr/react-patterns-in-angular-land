import { AfterViewInit, Component, OnDestroy, ContentChildren, QueryList, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TimelineLite } from 'gsap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
	private _selectedTabValues: string[] = [];

	writeValue(value: any) {
		if (value) {
			this.selectedTabValues = value;
		}
	}
	registerOnChange(onChange: any) {
		this.onChange = onChange;
	}
	registerOnTouched(onTouched: any) {
		this.onTouched = onTouched;
	}

	get selectedTabValues() {
		return this._selectedTabValues;
	}
	set selectedTabValues(value) {
		this._selectedTabValues = value;
		this.onChange(this._selectedTabValues);
	}
	get selectedTabs() {
		return this.selectedTabValues.map((value) => this.tabs.find((tab) => tab.value === value));
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
				this.selectedTabValues = [tab.value];
				this.animateTabStyles();
			})
		);
	}

	private animateTabStyles() {
		let timeline = new TimelineLite()
			.add(this.tabs.map((tab) => tab.animateDeselection()), 'start');

		if (this.selectedTabs.length) {
			this.selectedTabs.forEach((tab) => {
				timeline = timeline.add(tab.animateSelection(), 'start');
			});
		}

		return timeline;
	}

	ngOnDestroy() {
		this.killSubscriptions.next();
	}
}
