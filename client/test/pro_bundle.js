/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports) {

	describe('the bands post function', function () {
	  it('adds a band', () => {
	    browser.get('http://localhost:5000');
	    element(by.model('band.bandName')).sendKeys('test band');
	    element(by.id('createBand')).click();
	    var el = element(by.repeater('band in bandsctrl.bands').row(0).column('bandName'));
	    el.getText().then((text) => {
	      expect(text).toEqual('test band is a Rock band.');
	    });
	  });
	
	  it('deletes a band', () => {
	    browser.get('http://localhost:5000');
	    var elField = element(by.repeater('band in bandsctrl.bands').row(0));
	    var delBtn = elField.element(by.buttonText("Remove This Band"));
	    delBtn.click();
	    var el = element(by.repeater('band in bandsctrl.bands').row(0).column('bandName'));
	    expect(el.isPresent()).toBe(false);
	  });
	});


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = exports = {
	  config: {
	    seleniumAddress: 'http://localhost:4444/wd/hub',
	    specs: ['bands_spec.js', 'songs_spec.js']
	  }
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	describe('the songs post function', function () {
	  it('it should add a song', function () {
	    browser.get('http://localhost:5000');
	    element(by.model('song.title')).sendKeys('Rock and Roll');
	    element(by.id('createSong')).click();
	    var el = element(by.repeater('song in songsctrl.songs').row(0).column('title'));
	    el.getText().then((text) => {
	      expect(text).toEqual('Rock and Roll is performed by a rock band.');
	    });
	  });
	
	  it('deletes a song', () => {
	    browser.get('http://localhost:5000');
	    var elField = element(by.repeater('song in songsctrl.songs').row(0));
	    var delBtn = elField.element(by.buttonText("Remove This Song"));
	    delBtn.click();
	    var el = element(by.repeater('song in songsctrl.songs').row(0).column('title'));
	    expect(el.isPresent()).toBe(false);
	  });
	});


/***/ }
/******/ ]);
//# sourceMappingURL=pro_bundle.js.map