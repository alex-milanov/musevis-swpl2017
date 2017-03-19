'use strict';

// dom
const {
	section, button, span, h1, h2, pre, code,
	form, fieldset, label, legend, input, select, option
} = require('iblokz/adapters/vdom');

const slides = require('./slides');
const controls = require('./controls');

module.exports = ({state, actions}) => section('#ui', [
	slides({state, actions}),
	controls({state, actions})
]);
