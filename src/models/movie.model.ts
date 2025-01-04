import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";

export interface IMovie extends Document {
  imdbID: string;
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: {
    source: string;
    value: string;
  }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}


const MovieSchema: Schema = new Schema({
  imdbID: { type: String, required: true, unique: true },
  Title: { type: String },
  Year: { type: String },
  Rated: { type: String },
  Released: { type: String },
  Runtime: { type: String },
  Genre: { type: String },
  Director: { type: String },
  Writer: { type: String },
  Actors: { type: String },
  Plot: { type: String },
  Language: { type: String },
  Country: { type: String },
  Awards: { type: String },
  Poster: { type: String },
  Ratings: [
    {
      source: { type: String },
      value: { type: String },
    },
  ],
  Metascore: { type: String },
  imdbRating: { type: String },
  imdbVotes: { type: String },
  Type: { type: String },
  DVD: { type: String },
  BoxOffice: { type: String },
  Production: { type: String },
  Website: { type: String },
  Response: { type: String },
});

export default mongoose.model<IMovie>("Movie", MovieSchema);
