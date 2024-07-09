const express = require("express");
const movieController = require("../controllers/movie");
const { verify, verifyAdmin, verifyNonAdmin } = require("../auth");

const router = express.Router();

// POST /movies/addMovie - Add a new movie.
// GET /movies/getMovies - Retrieve a list of all movies.
// GET /movies/getMovie/:id - Retrieve a specific movie by its ID.
// PATCH /movies/updateMovie/:id - Update an existing movie.
// DELETE /movies/deleteMovie/:id - Delete a movie by its ID.
// PATCH /movies/addComment/:id - Add a comment to an existing movie.
// GET /movies/getComments/:id - Retrieve a list of all comments to a movies by its ID.

// addMovie
// getAllMovies
// getMovieById
// updateMovie
// deleteMovie
// addComment
// getComments



router.post("/addMovie", verify, verifyAdmin, movieController.addMovie);
router.get("/getMovies", movieController.getAllMovies);
router.get("/getMovie/:id", movieController.getMovieById);
router.patch("/updateMovie/:id", verify, verifyAdmin, movieController.updateMovie);
router.delete("/deleteMovie/:id", verify, verifyAdmin, movieController.deleteMovie);
router.patch("/addComment/:id", verify, verifyNonAdmin, movieController.addComment);
router.get("/getComments/:id", verify, movieController.getComments);


module.exports = router;