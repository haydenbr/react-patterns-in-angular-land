import { Component, Input } from '@angular/core';

@Component({
	selector: 'image-card',
	styles: [`
		:host {
			display: inline-block;
		}

		flip-card {
			height: 400px;
			width: 350px;
		}

		flip-card-front {
			background-position: 25%;
			background-repeat: no-repeat;
			background-size: cover;
		}

		flip-card-back {
			align-items: center;
			background: pink;
			color: yellow;
			display: flex;
			font-family: "Comic Sans MS", cursive, sans-serif;
			font-size: 24px;
			justify-content: center;
		}
	`],
	template: `
		<flip-card>
			<flip-card-front [style.background-image]="imgUrl">
			</flip-card-front>
			<flip-card-back>
				<ng-content select="image-card-caption"></ng-content>
			</flip-card-back>
		</flip-card>
	`
})
export class ImageCardComponent {
	@Input() imgSrc: string;

	get imgUrl() {
		return `url(${this.imgSrc})`;
	}
}
