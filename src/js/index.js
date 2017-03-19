'use strict';

// lib
const Rx = require('rx');
const $ = Rx.Observable;

window.marked = require('marked');

// iblokz
const vdom = require('iblokz/adapters/vdom');
const obj = require('iblokz/common/obj');
const arr = require('iblokz/common/arr');

// app
const app = require('iblokz/app/util');
let actions = app.adapt(require('./actions'));
let ui = require('./ui');
let actions$;

const gamepad = require('./util/gamepad');

// hot reloading
if (module.hot) {
	// actions
	actions$ = $.fromEventPattern(
		h => module.hot.accept("./actions", h)
	).flatMap(() => {
		actions = app.adapt(require('./actions'));
		return actions.stream.startWith(state => state);
	}).merge(actions.stream);
	// ui
	module.hot.accept("./ui", function() {
		ui = require('./ui');
		actions.stream.onNext(state => state);
	});
} else {
	actions$ = actions.stream;
}

// actions -> state
const state$ = actions$
	.startWith(() => actions.initial)
	.scan((state, change) => change(state), {})
	.map(state => (console.log(state), state))
	.share();

document.addEventListener('keydown', e => {
	console.log(e.key, e.target, e);
	if (e.target.contentEditable === 'true') {
		switch (e.key) {
			case 'Escape':
				e.target.blur();
				window
					.getSelection()
					.removeAllRanges();
				document.querySelector('.slides').focus();
				break;
			case 'Tab':
				e.preventDefault();
				document.execCommand('insertHTML', false, '&#009');
				break;
			default:
				break;
		}
		return;
	}
	if (e.key === 'E' && e.shiftKey === true && e.ctrlKey === true)
		actions.toggleControls();

	if (e.key === 'ArrowUp') actions.move('top');
	if (e.key === 'ArrowRight') actions.move('right');
	if (e.key === 'ArrowDown') actions.move('bottom');
	if (e.key === 'ArrowLeft') actions.move('left');
});

// state -> ui
const ui$ = state$.map(state => ui({state, actions}))
	.map(uiTree => (console.log({uiTree}), uiTree));

vdom.patchStream(ui$, '#ui');

actions.loadSlides();

window.setTimeout(() => {
	if (window.LiveReload) {
		window.LiveReload.reloader.reloadPage = (...args) => console.log({reloadPage: args});
		const _reload = window.LiveReload.reloader.reload.bind(window.LiveReload.reloader);
		window.LiveReload.reloader.reload = (...args) => {
			console.log({reload: args});
			if (args[0].match(/slides\.md$/i)) actions.loadSlides();
			_reload(...args);
		};
	}
	// window.LiveReload.on('reload', (...args) => console.log({reload: args}));
}, 1000);

gamepad.changes()
	.map(pads => (console.log({pads}), pads))
	// .withLatestFrom(pressedKeys$, (pads, keys) => ({pads, keys}))
	.subscribe(pads => {
		console.log(pads[0]);
		if (pads[0]) {
			if (pads[0].axes[1] < 0) actions.move('top');
			if (pads[0].axes[0] > 0) actions.move('right');
			if (pads[0].axes[1] > 0) actions.move('bottom');
			if (pads[0].axes[0] < 0) actions.move('left');
		}
	});
