const service = require('./service');
// todo validate and check for null
exports.getRawMovieList = function getRawMovieList() {
  if (service.getRawMovieList) {
    return service.getRawMovieList();
  }
  return false;
};

