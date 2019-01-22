import { TweenLite, TweenConfig, Back, Expo } from 'gsap';

const duration = 0.5;
const selectEase = Back.easeInOut.config(1);
const deselectEase = Expo.easeOut;
const selectedX = 50;
const deselectedX = 0;
const selectedOpacity = 1;
const deselectedOpacity = 0.7;

export function animateSelection(target, config: TweenConfig = {}) {
	const toConfig: TweenConfig = {
		x: selectedX,
		opacity: selectedOpacity,
		ease: selectEase,
		force3D: true,
	};
	return TweenLite.to(target, duration, { ...toConfig, ...config });
}

export function animateDeselection(target, config: TweenConfig) {
	const fromConfig: TweenConfig = {
		x: deselectedX,
		opacity: deselectedOpacity,
		ease: deselectEase,
		force3D: true,
	};
	return TweenLite.to(target, duration, { ...fromConfig, ...config });
}
