const axios = require("axios");
class MoviesControllers {
  static async fetchMoviesByPages(req, res, next) {
    try {
      const { page } = req.query;
      const data = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIE_DB_API_KEY}&page=${page}`
      );

      if (!data.data.results) {
        return res.status(404).send({ message: "This page does not exist" });
      }
      return res.status(200).send(data.data.results);
    } catch (error) {
      if (error.response.status === 404) {
        return res.status(404).send({ message: "This page does not exist" });
      }
      res.status(400).send(error);
    }
  }

  static async fetchMovieById(req, res, next) {
    try {
      const id = req.params.id;
      const data = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US`
      );
      if (!data) {
        return res.status(404).send({ message: "Movie not found" });
      }
      return res.status(200).send(data.data);
    } catch (error) {
      if (error.response.status === 404) {
        return res.status(404).send({ message: "Movie not found" });
      }
      res.status(400).send(error);
    }
  }
  static async fetchMovieVideoById(req, res, next) {
    try {
      const id = req.params.id;
      const data = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US`
      );
      if (!data.data || data.data.results.length < 1) {
        return res.status(404).send({ message: "Movie trailer not found" });
      }
      return res.status(200).send(data.data);
    } catch (err) {
      if (err.response.status === 404) {
        return res.status(404).send({ message: "Movie Trailer not found" });
      }
      res.status(400).send(err);
    }
  }
  static async fetchMovieByName(req, res, next) {
    try {
      const { query } = req.query;

      const data = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_DB_API_KEY}&query=${query}`
      );

      if (!data.data || data.data.results.length < 1) {
        return res.status(404).send({ message: "Movie not found" });
      }
      return res.status(200).send(data.data);
    } catch (err) {
      if (err.response.status === 404) {
        return res.status(404).send({ message: "Movie not found" });
      }
      res.status(400).send(err);
    }
  }
}

module.exports = MoviesControllers;
