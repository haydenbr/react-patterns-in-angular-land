import { NgModule } from '@angular/core';

import { SharedModule } from '@quiz/shared';
import { COMPONENTS } from './components';

@NgModule({
	imports: [SharedModule],
	exports: [COMPONENTS],
	declarations: [COMPONENTS],
	providers: [],
})
export class QuizModule { }
