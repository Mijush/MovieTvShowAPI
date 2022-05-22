const axios = require("axios");

class TvShowsController {
  static async fetchTvShowByName(req, res, next) {
    try {
      const { query } = req.query;
      const data = await axios.get(
        `https://api.themoviedb.org/3/search/tv?api_key=${process.env.MOVIE_DB_API_KEY}&query=${query}`
      );

      if (!data.data || data.data.results.length < 1) {
        return res.status(404).send({ message: "TV Show not found" });
      }
      return res.status(200).send(data.data);
    } catch (err) {
      if (err.response.status === 404) {
        return res.status(404).send({ message: "TV Show not found" });
      }
      res.status(400).send(err);
    }
  }

  static async fetchTvShowById(req, res, next) {
    try {
      const id = req.params.id;
      const data = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US`
      );
      if (!data) {
        return res.status(404).send({ message: "TV Show not found" });
      }
      return res.status(200).send(data.data);
    } catch (error) {
      if (error.response.status === 404) {
        return res.status(404).send({ message: "TV Show not found" });
      }
      res.status(400).send(error);
    }
  }
  static async fetchTvShowVideoById(req, res, next) {
    try {
      const id = req.params.id;
      const data = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US`
      );
      if (!data.data || data.data.results.length < 1) {
        return res.status(404).send({ message: "TV Show trailer not found" });
      }
      return res.status(200).send(data.data);
    } catch (err) {
      if (err.response.status === 404) {
        return res.status(404).send({ message: "TV Show Trailer not found" });
      }
      res.status(400).send(err);
    }
  }
}

module.exports = TvShowsController;
