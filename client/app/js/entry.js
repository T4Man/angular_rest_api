const angular = require('angular'); // eslint-disable-line
const angularApp = angular.module('angularApp', []);

require('./bands')(angularApp);
require('./songs')(angularApp);
