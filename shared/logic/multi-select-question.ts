import { QuestionStateReducer, QuestionStateChange } from '../types';

export const multipleSelectQuestion: QuestionStateReducer = (state, changes) => {
	if (changes.type !== QuestionStateChange.SelectAnswer) {
		return changes;
	}

	let newAnswerSelection = changes.selectedAnswerIds[0];

	if (state.selectedAnswerIds.includes(newAnswerSelection)) {
		return { selectedAnswerIds: state.selectedAnswerIds.filter(id => id !== newAnswerSelection) };
	} else {
		return { selectedAnswerIds: state.selectedAnswerIds.concat(newAnswerSelection) };
	}
}
