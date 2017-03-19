'use strict';

const path = require('path');

const paths = [].concat(
	require('bourbon').includePaths,
	require('bourbon-neat').includePaths,
	require('code-prettify').includePaths,
	path.resolve(__dirname, '..', 'node_modules/font-awesome/scss')
);

process.stdout.write(paths.join(':'));
