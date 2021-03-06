import { AfterViewInit, Component, OnDestroy, ContentChildren, QueryList, Input } from '@angular/core';
import { TimelineLite } from 'gsap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TabButtonGroupStateReducer, TabButtonGroupState } from '@shared/types';
import { TabButtonComponent } from '../tab-button/tab-button.component';

@Component({
	selector: 'tab-button-group',
	styles: [`
		:host { display: block; }
	`],
	template: `<ng-content select="tab-button"></ng-content>`,
})
export class TabButtonGroupComponent implements AfterViewInit, OnDestroy {
	@ContentChildren(TabButtonComponent) private tabs = new QueryList<TabButtonComponent>();
	@Input() onChange = (_: any) => {};
	@Input() stateReducer: TabButtonGroupStateReducer = (state, changes) => changes;
	private killSubscriptions = new Subject();
	private _selectedTabValues: string[] = [];
	private state: TabButtonGroupState = {
		selectedTabValues: []
	};

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

	ngOnDestroy() {
		this.killSubscriptions.next();
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

	private internalSetState(changes: any, callback = (_: any) => {}) {
		const currentState = this.state;
		const changesObject =
			typeof changes === 'function' ? changes(currentState) : changes;
		const { type, ...newState } = this.stateReducer(currentState, changesObject);
		this.state = {...currentState, ...newState};
		callback(this.state);
	}
}
