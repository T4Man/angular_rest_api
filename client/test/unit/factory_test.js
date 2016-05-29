const angular = require('angular');

describe('it should test the service', () => {
  var $httpBackend;
  var bandsctrl;
  var baseUrl = 'http://localhost:3000/api';
  beforeEach(angular.mock.module('angularApp'));
  beforeEach(angular.mock.inject((_$httpBackend_) => {
    $httpBackend = _$httpBackend_;
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should get all the band items', angular.mock.inject(function(tfResource) {
    $httpBackend.expectGET(baseUrl + '/bands').respond(200, [{ name: 'Moby'}]);
    var resourceArray = [];
    var errorsArray = [];
    var resource = new tfResource(resourceArray, errorsArray, baseUrl + '/bands');
    resource.getAll();
    $httpBackend.flush();
    expect(resourceArray.length).toBe(1);
    expect(errorsArray.length).toBe(0);
    expect(resourceArray[0].name).toBe('Moby');
  }));

  it('should get all the song items', angular.mock.inject(function(tfResource) {
    $httpBackend.expectGET(baseUrl + '/songs').respond(200, [{ name: 'Move'}]);
    var resourceArray = [];
    var errorsArray = [];
    var resource = new tfResource(resourceArray, errorsArray, baseUrl + '/songs');
    resource.getAll();
    $httpBackend.flush();
    expect(resourceArray.length).toBe(1);
    expect(errorsArray.length).toBe(0);
    expect(resourceArray[0].name).toBe('Move');
  }));

  it('should add a band item', angular.mock.inject(function(tfResource, $httpBackend) {
    $httpBackend.expectPOST(baseUrl + '/bands', {name: 'test band'}).respond(200, {name: 'another test', _id: 0});
    var resourceArray = [];
    var errorsArray = [];
    var resource = new tfResource(resourceArray, errorsArray, baseUrl + '/bands');
    resource.save({name: 'test band'});
    $httpBackend.flush();
    expect(resourceArray.length).toBe(1);
    expect(errorsArray.length).toBe(0);
    expect(resourceArray[0].name).toBe('another test');
  }));

  it('should add a song item', angular.mock.inject(function(tfResource, $httpBackend) {
    $httpBackend.expectPOST(baseUrl + '/songs', {name: 'test song'}).respond(200, {name: 'another test', _id: 0});
    var resourceArray = [];
    var errorsArray = [];
    var resource = new tfResource(resourceArray, errorsArray, baseUrl + '/songs');
    resource.save({name: 'test song'});
    $httpBackend.flush();
    expect(resourceArray.length).toBe(1);
    expect(errorsArray.length).toBe(0);
    expect(resourceArray[0].name).toBe('another test');
  }));

  it('should update a band item', angular.mock.inject(function(tfResource, $q) {
    var testBand = { name: 'not test', _id: 1 };
    var testArray = [testBand];
    var errorsArray = [];
    var resource = new tfResource(testArray, errorsArray, baseUrl + '/bands');
    $httpBackend.expectPUT(baseUrl + '/bands/1', testBand).respond(200);
    var result = resource.update(testBand);
    $httpBackend.flush();
    expect(errorsArray.length).toBe(0);
    expect(result instanceof $q).toBe(true);
  }));

  it('should update a song item', angular.mock.inject(function(tfResource, $q) {
    var testSong = { name: 'not test', _id: 1 };
    var testArray = [testSong];
    var errorsArray = [];
    var resource = new tfResource(testArray, errorsArray, baseUrl + '/songs');
    $httpBackend.expectPUT(baseUrl + '/songs/1', testSong).respond(200);
    var result = resource.update(testSong);
    $httpBackend.flush();
    expect(errorsArray.length).toBe(0);
    expect(result instanceof $q).toBe(true);
  }));

  it('should remove a band item', angular.mock.inject(function(tfResource, $httpBackend) {
    $httpBackend.expectDELETE(baseUrl  + '/bands/1').respond(200);
    var bands = [{ name: 'test band', _id:1 }];
    var errorsArray = [];
    var testRes = new tfResource(bands, errorsArray, baseUrl + '/bands');
    testRes.remove(bands[0]);
    $httpBackend.flush();
    expect(errorsArray.length).toBe(0);
    expect(bands.length).toBe(0);
  }));

  it('should remove a song item', angular.mock.inject(function(tfResource, $httpBackend) {
    $httpBackend.expectDELETE(baseUrl  + '/songs/1').respond(200);
    var songs = [{ name: 'test song', _id:1 }];
    var errorsArray = [];
    var testRes = new tfResource(songs, errorsArray, baseUrl + '/songs');
    testRes.remove(songs[0]);
    $httpBackend.flush();
    expect(errorsArray.length).toBe(0);
    expect(songs.length).toBe(0);
  }));
});
