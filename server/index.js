'use strict';

const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const debug = require('debug');

const logger = debug('mylogger');
logger('Starting app');

const app = express();

console.log(__dirname);
app.use(express.static(path.resolve(__dirname, '..', 'public')));


const port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log(`Server listening port ${port}`);
});