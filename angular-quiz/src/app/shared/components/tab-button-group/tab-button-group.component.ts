import { AfterViewInit, Component, OnDestroy, ContentChildren, QueryList, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TimelineLite, TweenConfig, TweenLite } from 'gsap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TabButtonComponent } from '../tab-button/tab-button.component';
import { animateInTabs, animateOutTabs } from './tab-button-group.animation';

const noopTween = () => new TweenLite({}, 0, 0);

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
	private shouldAnimateIn = false;
	private animateInConfig: TweenConfig = {};

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
	get tabElements() {
		return this.tabs.map((tab) => tab.nativeElement);
	}

	ngAfterViewInit() {
		this.applyInitialStyles();
		this.initTabSelectSubsctiptions();

		if (this.shouldAnimateIn) {
			this.animateIn(this.animateInConfig);
		}
	}

	private applyInitialStyles() {
		if (this.selectedTab) {
			this.selectedTab.nativeElement.classList.add('selected');
		}
	}

	private initTabSelectSubsctiptions() {
		this.tabs.forEach((tab) =>
			tab.tabSelect.pipe(takeUntil(this.killSubscriptions)).subscribe(() => {
				if (tab.value === this.value) {
					return;
				}

				this.value = tab.value;
				this.animateTabStyles();
			})
		);
	}

	private animateTabStyles() {
		return new TimelineLite()
			.add(this.tabs.map((tab) => tab.animateDeselection()), 'start')
			.add(this.selectedTab.animateSelection(), 'start');
	}

	ngOnDestroy() {
		this.killSubscriptions.next();
	}

	writeValue(value: any) {
		if (value) {
			this.value = value;
		}
	}

	registerOnChange(fn) {
		this.onChange = fn;
	}

	registerOnTouched(fn) {
		this.onTouched = fn;
	}

	public animateIn(config: TweenConfig = {}) {
		if (this.tabElements && this.tabElements.length) {
			return animateInTabs(this.tabElements, config);
		} else {
			this.shouldAnimateIn = true;
			this.animateInConfig = config;
			return noopTween();
		}
	}

	public animateOut(config: TweenConfig = {}) {
		return animateOutTabs(this.tabElements, config);
	}
}
