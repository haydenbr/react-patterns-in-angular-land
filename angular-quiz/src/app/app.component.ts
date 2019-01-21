import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	formControl = new FormControl();
	formGroup: FormGroup;

	constructor(fb: FormBuilder) {
		this.formGroup = fb.group({
			formyMcFormface: ''
		});
	}

	ngOnInit() {
		this.formControl.valueChanges.subscribe((value) => console.log('formControl', value));
		this.formGroup.valueChanges.subscribe((value) => console.log('formControl', value));
	}
}
