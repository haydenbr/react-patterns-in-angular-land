import { TweenLite, TweenConfig, Back, Expo } from 'gsap';

const duration = 0.5;
const selectEase = Back.easeInOut.config(1);
const deselectEase = Expo.easeOut;
const className = 'selected';
const selectedX = -10;
const selectedOpacity = 1;
const deselectedX = -80;
const deselectedOpacity = 0.6;

export function animateSelection(target, config: TweenConfig = {}) {
	const toConfig: TweenConfig = {
		className: `+=${className}`,
		x: selectedX,
		opacity: selectedOpacity,
		ease: selectEase,
		force3D: true,
	};
	return TweenLite.to(target, duration, { ...toConfig, ...config });
}

export function animateDeselection(target, config: TweenConfig) {
	const fromConfig: TweenConfig = {
		className: `-=${className}`,
		ease: deselectEase,
		x: deselectedX,
		opacity: deselectedOpacity,
		force3D: true,
	};
	return TweenLite.to(target, duration, { ...fromConfig, ...config });
}
