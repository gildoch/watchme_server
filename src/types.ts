export type CreateSessionDTO = {
  email: string;
  password: string;
}

type UserData = {
  password: string;
  permissions: string[];
  roles: string[];
}

export type TWatchlist  = {
  _id?: string;
  name: string;
  description?: string;
  created_at: Date;
  updated_at?: Date;
}

export type TMovie = {
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
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
};


export type UsersStore = Map<string, UserData>

export type RefreshTokensStore = Map<string, string[]>

export type DecodedToken = {
  sub: string;
}