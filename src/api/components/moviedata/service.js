const models = require('../../../../db/models');

const moviemodel = models.movieModel
exports.getRawMovieList = async function () {
  const movielist = await moviemodel.findAll();
  return movielist;
};
