module.exports = function(err, res) {
  console.log(err);
  this.errors = (this.errors || []).push(error);
};
