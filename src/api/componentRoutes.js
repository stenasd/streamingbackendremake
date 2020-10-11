const movieListRoute = require('./components/moviedata/routes');
const userRoute = require('./components/user/routes');
// var moviecomponent = require('./components/moviedata/routes')
exports.initRestRoutes = function (app) {
  movieListRoute.movieDataRoute(app);
  userRoute.route(app)
};
