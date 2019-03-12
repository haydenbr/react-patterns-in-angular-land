import { Component, Input } from '@angular/core';

import { TabButtonGroupStateReducer, TabButtonGroupStateChange } from '@shared/types';

@Component({
	selector: 'tab-button-group-multi-select',
	template: `
		<tab-button-group [onChange]="onChange" [stateReducer]="multiSelectStateReducer">
			<ng-content select="tab-button"></ng-content>
		</tab-button-group>
	`
})
export class TabButtonGroupMultiSelectComponent {
	@Input() onChange = (_: any) => {};
	multiSelectStateReducer: TabButtonGroupStateReducer = (state, changes) => {
		if (changes.type !== TabButtonGroupStateChange.SelectTab) {
			return changes;
		}

		let newSelection = changes.selectedTabValues[0];
		let selectedTabValues: string[] = [];

		if (state.selectedTabValues.includes(newSelection)) {
			selectedTabValues = state.selectedTabValues.filter(v => v !== newSelection);
		} else {
			selectedTabValues = state.selectedTabValues.concat(newSelection);
		}

		return { selectedTabValues };
	}
}
