import { Router } from "express";

import {
  getWatchlists,
  getWatchlistById,
  addWatchlist,
  updateWatchlist,
  deleteWatchlist,
  getWatchlistWithMovies,
  addMoviesToWatchlist,
  removeMovieFromWatchlist
} from "../controllers/watchlist.controller";

const router = Router();

// Watchlist Routes
router.get("/watchlists", getWatchlists); // Get all watchlists
router.get("/watchlists/:id", getWatchlistById); // Get a single watchlist by ID

// Movies within a Watchlist
router.get("/watchlists/:id/movies", getWatchlistWithMovies); // Get movies in a specific watchlist
router.put("/watchlists/:id/movies", addMoviesToWatchlist); // Add movies to a watchlist
router.put("/watchlists/:id/moviesId", removeMovieFromWatchlist); // Remove a specific movie from a watchlist

// Watchlist CRUD Operations
router.post("/watchlists", addWatchlist); // Create a new watchlist
router.put("/watchlists/:id", updateWatchlist); // Update a watchlist by ID
router.delete("/watchlists/:id", deleteWatchlist); // Delete a watchlist by ID



module.exports = router;
