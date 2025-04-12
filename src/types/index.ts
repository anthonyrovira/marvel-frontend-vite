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

export type TCharacters = {
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
  characters: TCharacters[];
};

export interface IDataCharacter {
  _id: string;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: TComic[];
}

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
    characters: any[];
    comics: any[];
  };
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ToggleFavoriteResponse {
  message: string;
  favorites: {
    characters: any[];
    comics: any[];
  };
}

export interface Comic {
  _id: string;
  title: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export interface Character {
  _id: string;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: Comic[];
}
