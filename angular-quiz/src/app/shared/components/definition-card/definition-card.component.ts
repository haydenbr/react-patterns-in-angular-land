import { Component } from '@angular/core';

@Component({
	selector: 'definition-card',
	styles: [`
		:host {
			display: inline-block;
		}

		flip-card {
			height: 230px;
			width: 315px;
			--flip-card-padding: 20px;
		}

		flip-card-front, flip-card-back {
			background-color: white;
		}

		flip-card-front {
			align-items: center;
			color: #0066ff;
			display: flex;
			font-weight: bold;
			height: 100%;
			justify-content: center;
		}
	`],
	template: `
		<flip-card>
			<flip-card-front>
				<h2>
					<ng-content select="definition-card-front"></ng-content>
				</h2>
			</flip-card-front>
			<flip-card-back>
				<ng-content select="definition-card-back"></ng-content>
			</flip-card-back>
		</flip-card>
	`
})
export class DefinitionCardComponent {}
