'use strict'

const detect = require( './lib/detection.js' ).detectTor;

module.exports.isTor = detect.isTor;