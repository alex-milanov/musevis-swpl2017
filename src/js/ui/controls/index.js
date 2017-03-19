'use strict';

// dom
const {
	section, button, span, h1, h2, pre, code,
	form, fieldset, label, legend, input, select, option,
	ul, li
} = require('iblokz/adapters/vdom');

const animList = [
	'moveToTop',
	'moveFromTop',
	'moveToLeft',
	'moveFromLeft',
	'moveToBottom',
	'moveFromBottom',
	'moveToRight',
	'moveFromRight',
	'scaleDown',
	'scaleUp'
];

const tabs = {
	ctrl: 'Control',
	anim: 'Animation',
	edit: 'Edit',
	file: 'File'
};

module.exports = ({state, actions}) => section('.controls', {
	class: {on: state.controls.on}
}, [
	ul('.tabs', Object.keys(tabs).map(tab =>
		li({
			class: {on: state.controls.tab === tab},
			on: {click: () => actions.setTab(tab)}
		}, tabs[tab])
	)),
	label('top in/out'),
	select({on: {change: ev => actions.changeAnim('top', 'in', ev.target.value)}}, animList.map(
		anim => option({attrs: {selected: anim === state.anim.top.in}, prop: {value: anim}}, anim))
	),
	select({on: {change: ev => actions.changeAnim('top', 'out', ev.target.value)}}, animList.map(
		anim => option({attrs: {selected: anim === state.anim.top.out}, prop: {value: anim}}, anim))
	),
	label('left in/out'),
	select({on: {change: ev => actions.changeAnim('left', 'in', ev.target.value)}}, animList.map(
		anim => option({attrs: {selected: anim === state.anim.left.in}, prop: {value: anim}}, anim))
	),
	select({on: {change: ev => actions.changeAnim('left', 'out', ev.target.value)}}, animList.map(
		anim => option({attrs: {selected: anim === state.anim.left.out}, prop: {value: anim}}, anim))
	),
	label('bottom in/out'),
	select({on: {change: ev => actions.changeAnim('bottom', 'in', ev.target.value)}}, animList.map(
		anim => option({attrs: {selected: anim === state.anim.bottom.in}, prop: {value: anim}}, anim))
	),
	select({on: {change: ev => actions.changeAnim('bottom', 'out', ev.target.value)}}, animList.map(
		anim => option({attrs: {selected: anim === state.anim.bottom.out}, prop: {value: anim}}, anim))
	),
	label('right in/out'),
	select({on: {change: ev => actions.changeAnim('right', 'in', ev.target.value)}}, animList.map(
		anim => option({attrs: {selected: anim === state.anim.right.in}, prop: {value: anim}}, anim))
	),
	select({on: {change: ev => actions.changeAnim('right', 'out', ev.target.value)}}, animList.map(
		anim => option({attrs: {selected: anim === state.anim.right.out}, prop: {value: anim}}, anim))
	)
]);
