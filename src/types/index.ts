export type TComic = {
  _id: string;
  title: string;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
};

export type TCharacter = {
  _id: string;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: TComic[];
};

export type UserFavorites = {
  comics: TComic[];
  characters: TCharacter[];
};

export interface SignUpRequest {
  email: string;
  username: string;
  password: string;
}

export interface SignInRequest {
  email?: string;
  username?: string;
  password: string;
}

export interface User {
  email: string;
  username: string;
  favorites: {
    characters: TCharacter[];
    comics: TComic[];
  };
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ToggleFavoriteResponse {
  message: string;
  favorites: {
    characters: TCharacter[];
    comics: TComic[];
  };
}
