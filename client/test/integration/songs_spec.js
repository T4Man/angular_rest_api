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
