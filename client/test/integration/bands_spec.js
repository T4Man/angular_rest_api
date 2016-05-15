describe('the bands post function', function () {
  it('it should add a band', function () {
    browser.get('http://localhost:5000');
    element(by.model('bandsctrl.newBand.bandName')).sendKeys('test band');
    element(by.id('createBand')).click();
    var el = element(by.repeater('band in bandsctrl.bands').row(0).column('bandName'));
    el.getText().then((text) => {
      expect(text).toEqual('test band is a Rock band.');
    });
  });
});
