const controller = require('./controller');

exports.movieDataRoute = async function movieDataRoute(app) {
  app.get('/api/videodata', async (req, res) => {
    res.status(200).json(await controller.getRawMovieList());
    
  });
};
