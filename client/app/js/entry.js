const angular = require('angular');
const angularApp = angular.module('angularApp', []);

require('./bands')(angularApp);
require('./songs')(angularApp);
