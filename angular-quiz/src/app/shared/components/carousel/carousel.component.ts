import {
	ChangeDetectorRef,
	Component,
	ViewChild,
	ContentChildren,
	QueryList,
	Output,
	ElementRef,
	AfterViewInit,
	TemplateRef,
} from '@angular/core';
import { SwiperComponent } from 'ngx-swiper-wrapper';
import { Subject } from 'rxjs';

import { CarouselSlideComponent } from '../carousel-slide/carousel-slide.component';

@Component({
	selector: 'carousel',
	templateUrl: 'carousel.component.html',
	styleUrls: ['carousel.component.scss'],
})
export class CarouselComponent implements AfterViewInit {
	@ContentChildren(CarouselSlideComponent) _slides: QueryList<CarouselSlideComponent> = new QueryList();
	@ViewChild(SwiperComponent) _swiper;
	@ViewChild('slideCaptionOutlet') _slideCaptionOutlet: ElementRef;
	@Output() slideChange = new Subject();
	readonly config = { width: 780, spaceBetween: 20, grabCursor: true, slidesOffsetBefore: 294, centeredSlides: true };
	private _captionTemplate: TemplateRef<any>;

	constructor(private cdRef: ChangeDetectorRef) {}

	onNext() {
		if (this.swiper) {
			this.swiper.slideNext();
		}
	}

	onPrevious() {
		if (this.swiper) {
			this.swiper.slidePrev();
		}
	}

	ngAfterViewInit() {
		this.captionTemplate = this.currentSlideCaption;
	}

	onSlideChange() {
		this.slideChange.next();
		this.captionTemplate = this.currentSlideCaption;
	}

	private get swiper() {
		return this._swiper && this._swiper.directiveRef && this._swiper.directiveRef.instance;
	}

	get slideCaptionOutlet() {
		return this._slideCaptionOutlet.nativeElement;
	}

	get slides() {
		return this._slides.toArray();
	}

	get hasPrevious(): boolean {
		return this.swiper && this.swiper.activeIndex > 0;
	}

	get hasNext(): boolean {
		return !this.swiper || this.currentIndex < this.slides.length - 1;
	}

	private get currentIndex() {
		return (this.swiper && this.swiper.activeIndex) || 0;
	}

	private get currentSlide(): CarouselSlideComponent {
		return this.slides[this.currentIndex];
	}

	get currentSlideCaption() {
		return this.currentSlide.caption;
	}

	get captionTemplate() {
		return this._captionTemplate;
	}

	set captionTemplate(newCaption: TemplateRef<any>) {
		this._captionTemplate = newCaption;
		this.cdRef.markForCheck();
		this.cdRef.detectChanges();
	}
}
