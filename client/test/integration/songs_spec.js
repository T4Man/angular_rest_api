describe('the songs post function', function () {
  it('it should add a song', function () {
    browser.get('http://localhost:5000');
    element(by.model('song.title')).sendKeys('Rock and Roll');
    element(by.id('createSong')).click();
    var el = element(by.repeater('song in songsctrl.songs').row(0).column('title'));
    el.getText().then((text) => {
      expect(text).toEqual('Rock and Roll is performed by a rock band.');
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
