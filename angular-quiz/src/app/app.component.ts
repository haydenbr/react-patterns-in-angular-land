import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, filter } from 'rxjs/operators';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	formControl = new FormControl();
	formGroup: FormGroup;
	tabButtonsFormControl = new FormControl();
	tabMessages$: Observable<string[]>;

	tabContents = [
		{value: 1, text: 'Utopian Jellyfish', message: 'Never gonna give you up'},
		{value: 2, text: 'Envious Harmony', message: 'Never gonna let you down'},
		{value: 3, text: 'Gainful Hen', message: 'Never gonna run around and desert you'},
		{value: 4, text: 'Hospitable Sponge', message: 'Never gonna make you cry'},
		{value: 5, text: 'Old-fashioned Arithmetic', message: 'Never gonna say goodbye'},
		{value: 6, text: 'Billowy Banana', message: 'Never gonna tell a lie and hurt you'},
	];

	props = {
		name: 'Hayden',
		id: 8135010632,
		message: 'Bob is cool',
		config: {
			color: 'red',
			radius: '45',
			fluxCapacitorReady: true
		}
	};

	constructor(fb: FormBuilder) {
		this.formGroup = fb.group({
			formyMcFormface: ''
		});
	}

	ngOnInit() {
		this.tabMessages$ = this.tabButtonsFormControl.valueChanges.pipe(
			startWith(this.tabButtonsFormControl.value),
			filter(x => !!x),
			map(selectedTabs => selectedTabs.map(tabValue => this.tabContents.find(tab => tab.value === tabValue))),
			map(tabs => tabs.map(tab => tab.message))
		);

		this.formControl.valueChanges.subscribe((value) => console.log('formControl', value));
		this.formGroup.valueChanges.subscribe((value) => console.log('formControl', value));
	}
}
