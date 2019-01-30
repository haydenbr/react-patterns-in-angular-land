import { TabButtonGroupStateChange } from './tab-button-group-change.enum';
import { TabButtonGroupState } from './tab-button-group-state.interface';

export type TabButtonGroupStateReducer = (
	state: TabButtonGroupState,
	changes: TabButtonGroupState & { type: TabButtonGroupStateChange }
) => TabButtonGroupState & { type?: TabButtonGroupStateChange };
