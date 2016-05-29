const angular = require('angular');
const angularApp = angular.module('angularApp', []);

require('./services')(angularApp);
require('./bands')(angularApp);
require('./songs')(angularApp);
