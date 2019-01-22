import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, filter } from 'rxjs/operators';

import { demoQuiz } from '@shared/demo-quiz';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	formControl = new FormControl();
	formGroup: FormGroup;
	demoQuiz = demoQuiz;
	tabButtonsFormControl = new FormControl(1);
	tabsContent$: Observable<string>;

	tabContents = [
		{value: 1, text: 'Utopian Jellyfish', message: 'Never gonna give you up'},
		{value: 2, text: 'Envious Harmony', message: 'Never gonna let you down'},
		{value: 3, text: 'Gainful Hen', message: 'Never gonna run around and desert you'},
		{value: 4, text: 'Hospitable Sponge', message: 'Never gonna make you cry'},
		{value: 5, text: 'Old-fashioned Arithmetic', message: 'Never gonna say goodbye'},
		{value: 6, text: 'Billowy Banana', message: 'Never gonna tell a lie and hurt you'},
	];

	constructor(fb: FormBuilder) {
		this.formGroup = fb.group({
			formyMcFormface: ''
		});
	}

	ngOnInit() {
		this.tabsContent$ = this.tabButtonsFormControl.valueChanges.pipe(
			startWith(this.tabButtonsFormControl.value),
			filter(x => !!x),
			map(value => this.tabContents.find(t => t.value === value)),
			map(tab => tab.message)
		);

		this.formControl.valueChanges.subscribe((value) => console.log('formControl', value));
		this.formGroup.valueChanges.subscribe((value) => console.log('formControl', value));
	}
}
