#!/bin/env node

process.env['BABEL_DISABLE_CACHE'] = 1;

process.argv.splice(2, 0, 'src/index.js');

require('babel-cli/lib/babel-node');
