import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
	selector: 'carousel-slide',
	template: `
		<ng-content></ng-content>
		<ng-template #caption>
			<ng-content select="carousel-slide-caption"></ng-content>
		</ng-template>
	`,
	styles: [`:host { display: block; box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5); border: 1px solid black; overflow-y: hidden; }`],
})
export class CarouselSlideComponent {
	@ViewChild('caption') readonly caption: TemplateRef<any>;
}
