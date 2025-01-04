# Watchlist API

The **Watchlist API** is a RESTful backend service designed to manage watchlists and movies. It allows users to create, update, and delete watchlists, as well as add and remove movies within a watchlist.

---

## Features
- Create, update, and delete watchlists.
- Add movies to watchlists.
- Retrieve movies in a specific watchlist.
- Prevent duplicate movies in a watchlist.
- Remove individual movies from a watchlist.

---

## Tech Stack
- **Node.js**: Backend runtime.
- **Express.js**: Web framework.
- **MongoDB**: Database for storing watchlists and movies.
- **Mongoose**: ODM for MongoDB.
- **TypeScript**: Ensures type safety.

---

## Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/watchlist-api.git
   ```
2. Navigate into the project directory:
   ```bash
   cd watchlist-api
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up the environment variables:
   Create a `.env` file in the root directory and configure the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongo_connection_string
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. The API will be available at `http://localhost:5000`.

---

## Endpoints

### Watchlist Routes
- `GET /watchlists`:
  - Retrieve all watchlists.

- `GET /watchlists/:id`:
  - Retrieve a specific watchlist by ID.

- `POST /watchlists`:
  - Create a new watchlist.
  - **Body Example**:
    ```json
    {
      "name": "My Favorite Movies",
      "description": "A collection of must-watch films."
    }
    ```

- `PUT /watchlists/:id`:
  - Update a watchlist by ID.
  - **Body Example**:
    ```json
    {
      "name": "Updated Watchlist Name",
      "description": "Updated description."
    }
    ```

- `DELETE /watchlists/:id`:
  - Delete a watchlist by ID.

### Movies in Watchlist
- `GET /watchlists/:id/movies`:
  - Retrieve all movies in a specific watchlist.

- `POST /watchlists/:id/movies`:
  - Add one or more movies to a watchlist.
  - **Body Example**:
    ```json
    {
      "movieIds": ["tt1234567", "tt9876543"]
    }
    ```

- `DELETE /watchlists/:id/movies/:movieId`:
  - Remove a specific movie from a watchlist.

---

## Error Handling
The API returns descriptive error messages for:
- Watchlist or movie not found (`404`).
- Duplicate movies being added to a watchlist (`400`).
- Validation errors (`400`).
- Server errors (`500`).

---

## Development Scripts
- `npm run dev`: Start the development server with hot reloading.
- `npm run build`: Compile the TypeScript code.
- `npm start`: Start the production server.

---

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact
For inquiries, please contact [your-email@example.com].

