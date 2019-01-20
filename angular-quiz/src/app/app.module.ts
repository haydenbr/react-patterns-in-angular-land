import { NgModule } from '@angular/core';

import { SharedModule } from '@quiz/shared';
import { QuizModule } from '@quiz/quiz';
import { AppComponent } from './app.component';

@NgModule({
	declarations: [AppComponent],
	imports: [SharedModule, QuizModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
