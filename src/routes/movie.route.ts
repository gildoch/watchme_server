import { Router } from "express";

import {
  getMovies,
  getMovieById,
  getMovieByField,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movie.controller";

const router = Router();

router.get("/movies", getMovies);
router.get("/movies/:id", getMovieById);
router.get("/movies/:field/:value",getMovieByField)
router.post("/movies", addMovie);
router.put("/movies/:id", updateMovie);
router.delete("/movies/:id", deleteMovie);


module.exports = router;
