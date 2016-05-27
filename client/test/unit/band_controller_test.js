const angular = require('angular');
require('angular-mocks');

describe('bands controller', () => {
  var $controller;

  beforeEach(angular.mock.module('angularApp'));

  beforeEach(angular.mock.inject((_$controller_) => {
    $controller = _$controller_;
  }));

  it('should be a controller', () => {
    var bandsctrl = $controller('BandsController');
    expect(typeof bandsctrl).toBe('object');
    expect(typeof bandsctrl.getAll).toBe('function');
  });

  describe('REST operations', () => {
    var $httpBackend;
    var bandsctrl;
    beforeEach(angular.mock.inject((_$httpBackend_) => {
      $httpBackend = _$httpBackend_;
      bandsctrl = $controller('BandsController');
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should send a GET to retrieve bands', () => {
      $httpBackend.expectGET('http://localhost:3000/api/bands').respond(200, [{
        name: 'test band'
      }]);
      bandsctrl.getAll();
      $httpBackend.flush();
      expect(bandsctrl.bands.length).toBe(1);
      expect(bandsctrl.bands[0].name).toBe('test band');
    });

    it('should add a band', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/bands', {
        name: 'added band'
      }).respond(200, {
        name: 'added band'
      });
      expect(bandsctrl.bands.length).toBe(0);
      bandsctrl.newBand = {
        name: 'added band'
      };
      bandsctrl.createBand();
      $httpBackend.flush();
      expect(bandsctrl.bands[0].name).toBe('added band');
      expect(bandsctrl.newBand).toBe(null);
    });

    it('should update a band', () => {
      $httpBackend.expectPUT('http://localhost:3000/api/bands/1', {
        name: 'updated band',
        editing: true,
        _id: 1
      }).respond(200);

      bandsctrl.bands = [{
        name: 'updated band',
        editing: true,
        _id: 1
      }];
      bandsctrl.bands[0].name = 'updated band';
      bandsctrl.updateBand(bandsctrl.bands[0]);
      $httpBackend.flush();
      expect(bandsctrl.bands[0].editing).toBe(false);
    });

    it('should delete a band', () => {
      $httpBackend.expectDELETE('http://localhost:3000/api/bands/1').respond(200);
      bandsctrl.bands = [{
        name: 'deleted band',
        _id: 1
      }];
      bandsctrl.removeBand(bandsctrl.bands[0]);
      $httpBackend.flush();
      expect(bandsctrl.bands.length).toBe(1);
    });
  });
});
