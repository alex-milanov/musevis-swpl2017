'use strict';

// lib
const Rx = require('rx');
const $ = Rx.Observable;

const prettify = require('code-prettify');

const obj = require('iblokz/common/obj');

// dom
const {
	h, section, button, span, h1, h2, h3,
	form, fieldset, label, legend, input, select, option,
	ul, li, p
} = require('iblokz/adapters/vdom');

// components
const code = require('./code');

// util
const arrEq = (arr1, arr2) => JSON.stringify(arr1) === JSON.stringify(arr2);
const arrFlatten = arr => arr.reduce((af, ai) => [].concat(af, ai), []);

const prepAnim = (pos, {index, old, direction, transitioning, anim}) => Object.assign({
	active: (arrEq(index, pos) || (arrEq(old, pos)) && transitioning === true),
	onTop: transitioning === true && arrEq(index, pos)
},
(transitioning === true && !arrEq(index, old) && (arrEq(index, pos) || arrEq(old, pos)))
	? obj.keyValue(anim[direction][arrEq(index, pos) ? 'in' : 'out'], true)
	: {}
);

const parseEl = el => (el.tag === 'code')
	? code(el.text)
	: (el.tag === 'p')
		? p({props: {innerHTML: el.text}})
		: h(el.tag, el.text || el.children && el.children.map(parseEl) || '');

const parseSlides = slides => slides.map(col =>
	col.map(parseEl)
);

module.exports = ({state, actions}) => section('.slides[tabindex="0"]',
	arrFlatten(parseSlides(state.slides).map((col, i) =>
		col.map((slide, k) =>
			section({
				class: prepAnim([i, k], state),
				on: (arrEq(state.index, [i, k]) && state.transitioning)
					? {animationend: () => actions.transitionend()} : {}
			}, [slide])
		))
	));
