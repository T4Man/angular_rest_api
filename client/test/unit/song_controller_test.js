var angular = require('angular');
require('angular-mocks');

describe('songs controller', () => {
  var $controller;

  beforeEach(angular.mock.module('angularApp'));

  beforeEach(angular.mock.inject((_$controller_) => {
    $controller = _$controller_;
  }));

  it('should be a controller', () => {
    var songsctrl = $controller('SongsController');
    expect(typeof songsctrl).toBe('object');
    expect(typeof songsctrl.getAll).toBe('function');
  });

  describe('REST operations', () => {
    var $httpBackend;
    var songsctrl;
    beforeEach(angular.mock.inject((_$httpBackend_) => {
      $httpBackend = _$httpBackend_;
      songsctrl = $controller('SongsController');
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should send a GET to retrieve songs', () => {
      $httpBackend.expectGET('http://localhost:3000/api/songs').respond(200, [{
        name: 'test song'
      }]);
      songsctrl.getAll();
      $httpBackend.flush();
      expect(songsctrl.songs.length).toBe(1);
      expect(songsctrl.songs[0].name).toBe('test song');
    });

    it('should add a song', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/songs', {
        name: 'Psycho'
      }).respond(200, {
        name: 'some song'
      });
      expect(songsctrl.songs.length).toBe(0);
      songsctrl.newSong = {
        name: 'Psycho'
      };
      songsctrl.createSong();
      $httpBackend.flush();
      expect(songsctrl.songs[0].name).toBe('some song');
      expect(songsctrl.newSong).toBe(null);
    });

    it('should update a song', () => {
      $httpBackend.expectPUT('http://localhost:3000/api/songs/1', {
        name: 'update song',
        editing: true,
        _id: 1
      }).respond(200);

      songsctrl.songs = [{
        name: 'test song',
        editing: true,
        _id: 1
      }];
      songsctrl.songs[0].name = 'update song';
      songsctrl.updateSong(songsctrl.songs[0]);
      $httpBackend.flush();
      expect(songsctrl.songs[0].editing).toBe(false);
    });

    it('should delete a song', () => {
      $httpBackend.expectDELETE('http://localhost:3000/api/songs/1').respond(200);
      songsctrl.songs = [{
        name: 'Psycho',
        _id: 1
      }];
      songsctrl.removeSong(songsctrl.songs[0]);
      $httpBackend.flush();
      expect(songsctrl.songs.length).toBe(0);
    });
  });
});
