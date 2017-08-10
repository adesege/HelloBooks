'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var app = (0, _express2.default)();
var renderFile = _ejs2.default.renderFile;
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_express2.default.static(_path2.default.join(__dirname, '../../template/assets/')));
app.set('views', _path2.default.join(__dirname, '../../template'));
app.engine('.html', renderFile);
app.set('secret', 'aaCaCRaCR}aCR}!aCR}!%aCR}!%^aCR}!%^<aCR}!%^<yaCR}!%^<ys');

(0, _routes2.default)(app);

exports.default = app;