const angular = require('angular');

describe('store service', () => {
  beforeEach(angular.mock.module('angularApp'));

  var tfStore;
  var $httpBackend;

  beforeEach(angular.mock.inject(function(_$httpBackend_, tfStore) {
    $httpBackend = _$httpBackend_;
    Store = tfStore;
  }));

  it('should be a service', () => {
    expect(typeof Store.addCount).toBe('function');
  });

  it('should have a counter', () => {
    expect(Store.count).toBe(0);
    Store.addCount();
    expect(Store.count).toBe(1);
    Store.minusCount();
    expect(Store.count).toBe(0);
  });
});
