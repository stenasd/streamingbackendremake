const { DataTypes } = require('sequelize');
const seq = require('./index');

const { sequelize } = seq;
const userModel = sequelize.define('userList', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
  },
  pass: {
    type: DataTypes.STRING,

  },
  moviedata: {
    type: DataTypes.STRING,

  },
}, {

});
exports.userModel = userModel;
const movieList = sequelize.define('movieList', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
  },
  path: {
    type: DataTypes.STRING,

  },
  magnet: {
    type: DataTypes.STRING,

  },
  image: {
    type: DataTypes.STRING,
  },
  genreArray: {
    type: DataTypes.STRING,
  },
}, {

});
exports.movieModel = movieList;


