import { AfterViewInit, Component, OnDestroy, ContentChildren, QueryList, Input } from '@angular/core';
import { TimelineLite } from 'gsap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TabButtonGroupStateReducer, TabButtonGroupState, TabButtonGroupStateChange } from '@shared/types';
import { TabButtonComponent } from '../tab-button/tab-button.component';

@Component({
	selector: 'tab-button-group',
	styles: [`
		:host { display: block; }
	`],
	template: `<ng-content select="tab-button, ng-content[select='tab-button']"></ng-content>`,
})
export class TabButtonGroupComponent implements AfterViewInit, OnDestroy {
	@ContentChildren(TabButtonComponent) private tabs = new QueryList<TabButtonComponent>();
	@Input() onChange = (_: any) => {};
	@Input() stateReducer: TabButtonGroupStateReducer = (state, changes) => changes;
	private killSubscriptions = new Subject();
	private state: TabButtonGroupState = {
		selectedTabValues: []
	};

	get selectedTabs() {
		return this.state.selectedTabValues.map((value) => this.tabs.find((tab) => tab.value === value));
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
				this.internalSetState(() => ({
					type: TabButtonGroupStateChange.SelectTab,
					selectedTabValues: [tab.value]
				}))
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

	private internalSetState(changes: any) {
		const currentState = this.state;
		const changesResult = changes(currentState);
		const { type, ...newState } = this.stateReducer(currentState, changesResult);
		this.state = {...currentState, ...newState};
		this.onChange(this.state.selectedTabValues);
	}
}
