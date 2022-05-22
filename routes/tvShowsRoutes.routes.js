const router = require("express").Router();
const tvShowController = require("../controllers/tvShowsController");

router.get("/search/tv", tvShowController.fetchTvShowByName);
router.get("/tv/:id", tvShowController.fetchTvShowById);
router.get("/tv/:id/videos", tvShowController.fetchTvShowVideoById);

module.exports = router;
