import { Animation, Power2, Back, TimelineMax, TweenMax } from 'gsap';

const animationFactor = 1; // for debugging;

export function animateFlipCardToBack(card: Element) {
	return doAnimation(card, rotateCardToBack);
}

export function animateFlipCardToFront(card: Element) {
	return doAnimation(card, rotateCardToFront);
}

function doAnimation(card: Element, rotationFunction: (cardFaces: Element[]) => Animation) {
	const cardFaces = Array.from(card.querySelectorAll('.card-face'));

	return new TimelineMax()
		.add(rotationFunction(cardFaces), '-=1')
		.timeScale(2.75 * animationFactor);
}

function resetCard(cardFaces: Element[]) {
	return TweenMax.set(cardFaces, { clearProps: 'all', overwrite: 'all' });
}

function rotateCardToBack(cardFaces: Element[]) {
	let flipDirection = -90;
	return rotateCard(cardFaces, flipDirection);
}

function rotateCardToFront(cardFaces: Element[]) {
	let flipDirection = -270;
	return rotateCard(cardFaces, flipDirection).eventCallback('onComplete', () => resetCard(cardFaces));
}

function rotateCard(cardFaces: Element[], flipDirection: number) {
	let tl = new TimelineMax()
		.staggerTo(
			cardFaces,
			1,
			{
				cycle: {
					rotationX: [flipDirection, flipDirection + 180],
				},
				ease: Back.easeIn.config(4),
				force3D: true,
			},
			0
		)
		.staggerTo(
			cardFaces,
			1,
			{
				cycle: {
					rotationX: [flipDirection - 90, flipDirection - 90 + 180],
				},
				ease: Back.easeOut.config(2),
				force3D: true,
			},
			0
		);

	return TweenMax.to(tl, 3, { progress: 1, ease: Power2.easeInOut });
}
