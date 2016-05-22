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
	    element(by.model('bandsctrl.newBand.bandName')).sendKeys('test band');
	    element(by.id('createBand')).click();
	    var el = element(by.repeater('band in bandsctrl.bands').row(0).column('bandName'));
	    el.getText().then((text) => {
	      expect(text).toEqual('test band is a Rock band.');
	    });
	  });
	
	  it('updates a band', () => {
	    browser.get('http://localhost:5000');
	    var elField = element(by.repeater('band in bandsctrl.bands').row(0));
	    var editBtn = elField.element(by.buttonText("Edit"));
	    editBtn.click();
	    element(by.model('band.bandName')).clear().sendKeys('some band');
	    element(by.model('band.genre')).clear().sendKeys('pop music');
	    var updateBtn = elField.element(by.buttonText('Update Band'));
	    updateBtn.click();
	    var el = element(by.repeater('band in bandsctrl.bands').row(0).column('bandName'));
	    el.getText().then((text) => {
	      expect(text).toEqual('some band is a pop music band.');
	    });
	  });
	
	  it('cancels a band update', () => {
	    browser.get('http://localhost:5000');
	    var elField = element(by.repeater('band in bandsctrl.bands').row(0));
	    var editBtn = elField.element(by.buttonText("Edit"));
	    editBtn.click();
	    element(by.model('band.bandName')).clear().sendKeys('country band');
	    element(by.model('band.genre')).clear().sendKeys('country music');
	    var cancelBtn = elField.element(by.buttonText('Cancel'));
	    cancelBtn.click();
	    var el = element(by.repeater('band in bandsctrl.bands').row(0).column('bandName'));
	    el.getText().then((text) => {
	      expect(text).toEqual('some band is a pop music band.');
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
	    element(by.model('songsctrl.newSong.title')).sendKeys('Rock and Roll');
	    element(by.id('createSong')).click();
	    var el = element(by.repeater('song in songsctrl.songs').row(0).column('title'));
	    el.getText().then((text) => {
	      expect(text).toEqual('Rock and Roll is performed by a rock band.');
	    });
	  });
	
	  it('updates a song', () => {
	    browser.get('http://localhost:5000');
	    var elField = element(by.repeater('song in songsctrl.songs').row(0));
	    var editBtn = elField.element(by.buttonText("Edit"));
	    editBtn.click();
	    element(by.model('song.title')).clear().sendKeys('some song');
	    element(by.model('song.bandName')).clear().sendKeys('a pop band');
	    var updateBtn = elField.element(by.buttonText('Update Song'));
	    updateBtn.click();
	    var el = element(by.repeater('song in songsctrl.songs').row(0).column('title'));
	    el.getText().then((text) => {
	      expect(text).toEqual('some song is performed by a pop band.');
	    });
	  });
	
	  it('cancels a song update', () => {
	    browser.get('http://localhost:5000');
	    var elField = element(by.repeater('song in songsctrl.songs').row(0));
	    var editBtn = elField.element(by.buttonText("Edit"));
	    editBtn.click();
	    element(by.model('song.title')).clear().sendKeys('country song');
	    element(by.model('song.bandName')).clear().sendKeys('country band');
	    var cancelBtn = elField.element(by.buttonText('Clear'));
	    cancelBtn.click();
	    var el = element(by.repeater('song in songsctrl.songs').row(0).column('title'));
	    el.getText().then((text) => {
	      expect(text).toEqual('some song is performed by a pop band.');
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