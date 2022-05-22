const router = require("express").Router();
const movieController = require("../controllers/movieController");

router.get("/movies", movieController.fetchMoviesByPages);

router.get("/movie/:id", movieController.fetchMovieById);
router.get("/movie/:id/videos", movieController.fetchMovieVideoById);
router.get("/search/movie", movieController.fetchMovieByName);

module.exports = router;
