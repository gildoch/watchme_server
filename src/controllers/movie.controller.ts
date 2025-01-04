import { Request, Response } from "express";
import Movie from "../models/movie.model";

/**
 * Asynchronous function to handle retrieving a list of movies from the database.
 *
 * This function is designed to be used as a route handler in an Express.js application.
 * It queries the database for all movies using the `Movie.find()` method and sends
 * the results back to the client as a JSON response.
 *
 * @param {Request} _req - The incoming HTTP request object. This parameter is not currently used.
 * @param {Response} res - The outgoing HTTP response object, used to send the response back to the client.
 *
 * @returns {Promise<void>} This function does not return a value directly but sends an HTTP response.
 *
 * ### Success Response:
 * - **Status Code**: 200 OK
 * - **Body**: An array of movies in JSON format.
 *
 * ### Error Response:
 * - **Status Code**: 500 Internal Server Error
 * - **Body**: A JSON object containing an error message.
 *   - Example: `{ "message": "Failed to fetch movies" }`
 *
 * ### Example Usage:
 * ```javascript
 * import { getMovies } from './movieController';
 *
 * app.get('/api/movies', getMovies);
 * ```
 */
export const getMovies = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Failed to fetch movies" });
  }
};

/**
 * Asynchronous function to retrieve a specific movie by its ID from the database.
 *
 * This function is designed to be used as a route handler in an Express.js application.
 * It extracts the movie ID from the request parameters, queries the database for the
 * corresponding movie using the `Movie.findById()` method, and sends the result back
 * to the client as a JSON response.
 *
 * @param {Request} req - The incoming HTTP request object.
 *   - `req.params.id`: The ID of the movie to retrieve.
 * @param {Response} res - The outgoing HTTP response object, used to send the response back to the client.
 *
 * @returns {Promise<void>} This function does not return a value directly but sends an HTTP response.
 *
 * ### Success Response:
 * - **Status Code**: 200 OK
 * - **Body**: The movie object in JSON format.
 *
 * ### Error Responses:
 * - **Status Code**: 404 Not Found
 *   - **Body**: A JSON object containing an error message if the movie with the specified ID does not exist.
 *     - Example: `{ "message": "Movie not found" }`
 * - **Status Code**: 500 Internal Server Error
 *   - **Body**: A JSON object containing an error message in case of server or database errors.
 *     - Example: `{ "message": "Failed to fetch movie" }`
 *
 * ### Example Usage:
 * ```javascript
 * import { getMovieById } from './movieController';
 *
 * app.get('/api/movies/:id', getMovieById);
 * ```
 *
 * ### Notes:
 * - The function checks whether a movie with the specified ID exists in the database.
 * - If the movie is not found, a `404 Not Found` response is returned.
 */
export const getMovieById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }
    res.status(200).json(movie);
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Failed to fetch movie" });
  }
};

/**
 * Asynchronous function to retrieve a movie from the database using a custom field.
 * 
 * This function is designed to be used as a route handler in an Express.js application. 
 * It retrieves the value of a custom field (e.g., `imdbID`) from the request parameters, 
 * fetches the corresponding movie document from the database, and sends the movie data 
 * back to the client as a JSON response.
 * 
 * @param {Request} req - The incoming HTTP request object.
 *   - `req.params.field`: The name of the field to search by (e.g., `imdbID`).
 *   - `req.params.value`: The value of the field to match.
 * @param {Response} res - The outgoing HTTP response object, used to send the response back to the client.
 * 
 * @returns {Promise<void>} This function does not return a value directly but sends an HTTP response.
 * 
 * ### Success Response:
 * - **Status Code**: 200 OK
 * - **Body**: The movie object in JSON format.
 * 
 * ### Error Responses:
 * - **Status Code**: 404 Not Found
 *   - **Body**: A JSON object containing an error message if the movie is not found.
 *     - Example: `{ "message": "Movie not found" }`
 * - **Status Code**: 500 Internal Server Error
 *   - **Body**: A JSON object containing an error message if the search fails.
 *     - Example: `{ "message": "Failed to fetch movie" }`
 * 
 * ### Example Usage:
 * ```javascript
 * import { getMovieByField } from './movieController';
 * 
 * app.get('/api/movies/:field/:value', getMovieByField);
 * ```
 */
export const getMovieByField = async (req: Request, res: Response): Promise<void> => {
  const { field, value } = req.params; // Extract the field name and value from the request parameters

  try {
    const query = { [field]: value }; // Create a dynamic query object
    const movie = await Movie.findOne(query); // Search for a movie matching the field and value

    if (!movie) {
      res.status(404).json({ message: "Movie not found" }); // Handle case when no movie is found
      return;
    }

    res.status(200).json(movie); // Respond with the found movie in JSON format
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Failed to fetch movie" }); // Handle errors
  }
};


/**
 * Asynchronous function to add a new movie to the database.
 *
 * This function is designed to be used as a route handler in an Express.js application.
 * It receives movie details from the request body, creates a new movie document, saves
 * it to the database, and sends the saved document back to the client as a JSON response.
 *
 * @param {Request} req - The incoming HTTP request object.
 *   - `req.body`: An object containing the details of the movie to be added.
 * @param {Response} res - The outgoing HTTP response object, used to send the response back to the client.
 *
 * @returns {Promise<void>} This function does not return a value directly but sends an HTTP response.
 *
 * ### Success Response:
 * - **Status Code**: 201 Created
 * - **Body**: The newly created movie object in JSON format.
 *
 * ### Error Response:
 * - **Status Code**: 400 Bad Request
 *   - **Body**: A JSON object containing an error message if the movie data is invalid or if saving fails.
 *     - Example: `{ "message": "Failed to add movie" }`
 *
 * ### Example Usage:
 * ```javascript
 * import { addMovie } from './movieController';
 *
 * app.post('/api/movies', addMovie);
 * ```
 *
 * ### Notes:
 * - The function validates and saves the movie using Mongoose's `save` method.
 * - The status code `201 Created` indicates successful creation of the resource.
 * - The function assumes the request body contains all required fields for the movie schema.
 */
export const addMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const movie = new Movie(req.body);
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err: any) {
    res.status(400).json({ message: err.message || "Failed to add movie" });
  }
};

/**
 * Asynchronous function to update an existing movie in the database by its ID.
 *
 * This function is designed to be used as a route handler in an Express.js application.
 * It retrieves the movie ID from the request parameters and updated movie details
 * from the request body. The function updates the movie in the database and sends
 * the updated document back to the client as a JSON response.
 *
 * @param {Request} req - The incoming HTTP request object.
 *   - `req.params.id`: The ID of the movie to update.
 *   - `req.body`: An object containing the updated movie details:
 *     - `imdbID`: The IMDb ID of the movie.
 *     - `Title`: The title of the movie.
 *     - `Year`: The release year of the movie.
 *     - `Type`: The type or genre of the movie.
 *     - `Poster`: The URL of the movie's poster.
 * @param {Response} res - The outgoing HTTP response object, used to send the response back to the client.
 *
 * @returns {Promise<void>} This function does not return a value directly but sends an HTTP response.
 *
 * ### Success Response:
 * - **Status Code**: 200 OK
 * - **Body**: The updated movie object in JSON format.
 *
 * ### Error Responses:
 * - **Status Code**: 404 Not Found
 *   - **Body**: A JSON object containing an error message if the movie with the specified ID does not exist.
 *     - Example: `{ "message": "Movie not found" }`
 * - **Status Code**: 400 Bad Request
 *   - **Body**: A JSON object containing an error message if the update fails due to validation or other errors.
 *     - Example: `{ "message": "Failed to update movie" }`
 *
 * ### Example Usage:
 * ```javascript
 * import { updateMovie } from './movieController';
 *
 * app.put('/api/movies/:id', updateMovie);
 * ```
 *
 * ### Notes:
 * - The function uses Mongoose's `findByIdAndUpdate` method to update the movie.
 * - The `new: true` option ensures the updated document is returned.
 * - The `runValidators: true` option enforces schema validation during the update.
 * - The function assumes the request body contains valid and complete data for updating the movie.
 */
export const updateMovie = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { imdbID, Title, Year, Type, Poster } = req.body;

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { imdbID, Title, Year, Type, Poster },
      { new: true, runValidators: true }
    );

    if (!updatedMovie) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }

    res.status(200).json(updatedMovie);
  } catch (err: any) {
    res.status(400).json({ message: err.message || "Failed to update movie" });
  }
};


/**
 * Asynchronous function to delete an existing movie from the database by its ID.
 *
 * This function is designed to be used as a route handler in an Express.js application.
 * It retrieves the movie ID from the request parameters, deletes the corresponding
 * movie document from the database, and sends a success or error response to the client.
 *
 * @param {Request} req - The incoming HTTP request object.
 *   - `req.params.id`: The ID of the movie to delete.
 * @param {Response} res - The outgoing HTTP response object, used to send the response back to the client.
 *
 * @returns {Promise<void>} This function does not return a value directly but sends an HTTP response.
 *
 * ### Success Response:
 * - **Status Code**: 200 OK
 * - **Body**: A JSON object confirming the deletion of the movie.
 *   - Example: `{ "message": "Movie deleted successfully" }`
 *
 * ### Error Responses:
 * - **Status Code**: 404 Not Found
 *   - **Body**: A JSON object containing an error message if the movie with the specified ID does not exist.
 *     - Example: `{ "message": "Movie not found" }`
 * - **Status Code**: 500 Internal Server Error
 *   - **Body**: A JSON object containing an error message if the deletion fails due to server or database issues.
 *     - Example: `{ "message": "Failed to delete movie" }`
 *
 * ### Example Usage:
 * ```javascript
 * import { deleteMovie } from './movieController';
 *
 * app.delete('/api/movies/:id', deleteMovie);
 * ```
 *
 * ### Notes:
 * - The function uses Mongoose's `findByIdAndDelete` method to delete the movie document.
 * - The status code `200 OK` indicates successful deletion, while `404 Not Found` indicates the movie does not exist.
 * - Proper error handling ensures server or database issues are communicated back to the client.
 */
export const deleteMovie = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (!deletedMovie) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Failed to delete movie" });
  }
};
