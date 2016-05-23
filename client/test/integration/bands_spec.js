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