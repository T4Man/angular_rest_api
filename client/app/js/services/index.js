module.exports = function(app) {
  require('./handle_error')(app);
  require('./tf_resource')(app);
};
