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
    var cancelBtn = elField.element(by.buttonText('Clear'));
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
