import mongoose, { Schema, Document } from "mongoose";
import { IMovie } from "./movie.model";

export interface IWatchlist extends Document {
  name: string;
  description?: string;
  created_at: Date;
  updated_at?: Date;
  movies: IMovie[];
}

const WatchlistSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

export default mongoose.model<IWatchlist>("Watchlist", WatchlistSchema);
