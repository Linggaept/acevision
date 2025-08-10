export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
}

export interface MovieDetail {
  title: string;
  tagline: string;
  backdrop_path: string;
  poster_path: string;
  runtime: number;
  genres: Array<{
    id: number;
    name: string;
  }>;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  production_companies: Array<{
    id: number;
    name: string;
    logo_path: string;
    origin_country: string; 
  }>;
  original_language: string;
}
export interface Cast {
  adult: boolean;
  gender: number; // 0: Not specified, 1: Female, 2: Male, 3: Non-binary
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null; // bisa null jika tidak ada foto
  cast_id: number;
  character: string;
  credit_id: string;
  order: number; // urutan dalam cast list (0 = main actor)
}

