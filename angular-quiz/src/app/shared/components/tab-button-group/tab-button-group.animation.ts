import { TweenMax, TweenConfig, Back } from 'gsap';

const hiddenX = -200;
const duration = 0.5;
const stagger = 0.1;
const enterEase = Back.easeOut.config(0.5);
const exitEase = Back.easeIn.config(0.5);

export function animateInTabs(target: any[], config: TweenConfig = {}) {
	const fromConfig: TweenConfig = {
		force3D: true,
		x: hiddenX,
		ease: enterEase,
		opacity: 0,
	};
	return TweenMax.staggerFrom(target, duration, { ...fromConfig, ...config }, stagger);
}

export function animateOutTabs(target: any[], config: TweenConfig = {}) {
	const toConfig: TweenConfig = { force3D: true, x: hiddenX, ease: exitEase, opacity: 0 };
	return TweenMax.staggerTo(target, duration, { ...toConfig, ...config }, stagger);
}
