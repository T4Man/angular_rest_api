var angular = require('angular');
require('angular-mocks');

describe('bands controller', function() {
  var $controller;

  beforeEach(angular.mock.module('angularApp'));

  beforeEach(angular.mock.inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  it('should be a controller', function() {
    var bandsctrl = $controller('BandsController');
    expect(typeof bandsctrl).toBe('object');
    expect(typeof bandsctrl.getAll).toBe('function');
  });

  describe('REST functionality', function() {
    var $httpBackend;
    var bandsctrl;
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      bandsctrl = $controller('BandsController');
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should send a GET to retrieve bands', function() {
      $httpBackend.expectGET('http://localhost:3000/api/bands').respond(200, [{
        name: 'test band'
      }]);
      bandsctrl.getAll();
      $httpBackend.flush();
      expect(bandsctrl.bands.length).toBe(1);
      expect(bandsctrl.bands[0].name).toBe('test band');
    });

    it('should add a band', function() {
      $httpBackend.expectPOST('http://localhost:3000/api/bands', {
        name: 'Muse'
      }).respond(200, {
        name: 'some band'
      });
      expect(bandsctrl.bands.length).toBe(0);
      bandsctrl.newBand = {
        name: 'Muse'
      };
      bandsctrl.createBand();
      $httpBackend.flush();
      expect(bandsctrl.bands[0].name).toBe('some band');
      expect(bandsctrl.newBand).toBe(null);
    });

    it('should update a band', function() {
      $httpBackend.expectPUT('http://localhost:3000/api/bands/1', {
        name: 'update band',
        editing: true,
        _id: 1
      }).respond(200);

      bandsctrl.bands = [{
        name: 'test band',
        editing: true,
        _id: 1
      }];
      bandsctrl.bands[0].name = 'update band';
      bandsctrl.updateBand(bandsctrl.bands[0]);
      $httpBackend.flush();
      expect(bandsctrl.bands[0].editing).toBe(false);
    });

    it('should delete a band', function() {
      $httpBackend.expectDELETE('http://localhost:3000/api/bands/1').respond(200);
      bandsctrl.bands = [{
        name: 'Muse',
        _id: 1
      }];
      bandsctrl.removeBand(bandsctrl.bands[0]);
      $httpBackend.flush();
      expect(bandsctrl.bands.length).toBe(0);
    });
  });
});
