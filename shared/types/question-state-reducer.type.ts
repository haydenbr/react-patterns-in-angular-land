import { QuestionState } from './question-state.interface';
import { QuestionStateChange } from './question-state-change.enum';

export type QuestionStateReducer = (
	state: QuestionState,
	changes: QuestionState & { type: QuestionStateChange }
) => QuestionState & { type?: QuestionStateChange };
