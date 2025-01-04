import { Request, Response } from "express";
import Watchlist from "../models/watchlist.model";


export const getWatchlists = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const watchlists = await Watchlist.find();
    res.status(200).json(watchlists);
  } catch (err: any) {
    res
      .status(500)
      .json({ message: err.message || "Failed to fetch watchlists" });
  }
};

export const getWatchlistById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params; // Extract ID from the request parameters

  try {
    const watchlist = await Watchlist.findById(id); // Query the database for the specific watchlist

    if (!watchlist) {
      res.status(404).json({ message: "Watchlist not found" });
      return;
    }

    res.status(200).json(watchlist); // Return the found watchlist
  } catch (err: any) {
    res
      .status(500)
      .json({ message: err.message || "Failed to fetch watchlist" });
  }
};


export const addWatchlist = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const watchlist = new Watchlist({
      name: req.body.name,
      description: req.body.description,
      created_at: new Date(),
    });

    const newWatchlist = await watchlist.save();
    res.status(201).json(newWatchlist);
  } catch (err: any) {
    res
      .status(400)
      .json({ message: err.message || "Failed to create watchlist" });
  }
};


export const updateWatchlist = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const updatedWatchlist = await Watchlist.findByIdAndUpdate(
      id,
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          updated_at: new Date(),
        },
      },
      { new: true, runValidators: true } // Return the updated document and apply validation
    );

    if (!updatedWatchlist) {
      res.status(404).json({ message: "Watchlist not found" });
      return;
    }

    res.status(200).json(updatedWatchlist);
  } catch (err: any) {
    res
      .status(400)
      .json({ message: err.message || "Failed to update watchlist" });
  }
};


export const deleteWatchlist = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedWatchlist = await Watchlist.findByIdAndDelete(id);

    if (!deletedWatchlist) {
      res.status(404).json({ message: "Watchlist not found" });
      return;
    }

    res.status(200).json({ message: "Watchlist deleted successfully" });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: err.message || "Failed to delete watchlist" });
  }
};

export const getWatchlistWithMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const watchlist = await Watchlist.findById(id).populate("movies"); // Query the database for the specific watchlist

    if (!watchlist) {
      res.status(404).json({ message: "Watchlist not found" });
      return;
    }

    res.status(200).json(watchlist); // Return the found watchlist
  } catch (err: any) {
    res
      .status(500)
      .json({ message: err.message || "Failed to fetch watchlist" });
  }
};

export const addMoviesToWatchlist = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params; // Watchlist ID
    const { movieIds } = req.body; // Expect an array of movie IDs

    const watchlist = await Watchlist.findById(id);

    if (!watchlist) {
      return res.status(404).json({ error: "Watchlist not found" });
    }

    // Filter out duplicate movie IDs
    const newMovies = movieIds.filter((movieId: string) => !watchlist.movies.includes(movieId));

    if (newMovies.length === 0) {
      return res.status(400).json({ code:"duplicateMovies",error: "Movie Already in Watchlist" });
    }

    // Add unique movie IDs to the watchlist
    watchlist.movies.push(...newMovies);
    await watchlist.save();

    res.status(200).json(watchlist);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to add movies to watchlist" });
  }
};

export const removeMovieFromWatchlist = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; // Watchlist ID
    const { movieId } = req.body; // Movie ID to remove

    console.log(id, movieId);
    

    const watchlist = await Watchlist.findById(id);

    if (!watchlist) {
      return res.status(404).json({ error: "Watchlist not found" });
    }

    // Remove the movie ID from the watchlist.movies array
    const movieIndex = watchlist.movies.indexOf(movieId);
    if (movieIndex === -1) {
      return res.status(404).json({ error: "Movie not found in watchlist" });
    }

    watchlist.movies.splice(movieIndex, 1);
    await watchlist.save();

    res.status(200).json(watchlist);
  } catch (error) {
    res.status(500).json({ error: "Failed to remove movie from watchlist" });
  }
};
