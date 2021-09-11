const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { validateNewMovie, validateMovieId } = require('../utils/validation');

router.get('/', getMovies);
router.post('/', validateNewMovie, createMovie);
router.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = router;
