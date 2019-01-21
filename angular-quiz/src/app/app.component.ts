import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	formControl = new FormControl();

	ngOnInit() {
		this.formControl.valueChanges.subscribe((value) => console.log('formControl', value));
	}
}
