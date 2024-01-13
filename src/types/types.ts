export interface IGettedArticles {
  articles: IArticle[];
  articlesCount: number;
}

export interface IGettedSingleArticle {
  article: IArticle;
}

export interface IRegisteredUser {
  email: string;
  token: string;
  username: string;
  image: string | null;
}

export interface IGettedRegisteredUser {
  user: IRegisteredUser;
}

export interface IArticle {
  title: string;
  description: string;
  body?: string;
  tagList: string[];
  author: IAuthor;
  favoritesCount: number;
  slug: string;
  createdAt: string;
}

export interface IAuthor {
  username: string;
  image: string | null;
}

export interface ISignUpUserBody {
  user: {
    username: string;
    email: string;
    password: string;
  };
}

export interface ISignInUserBody {
  user: {
    email: string;
    password: string;
  };
}

type editProfileBodyType = {
  user: {
    username: string;
    email: string;
    password?: string | null;
    image?: string | null;
  };
};

export interface IEditProfileData {
  body: editProfileBodyType;
  token: string | null;
}

export interface IInputValidatePattern {
  value: RegExp;
  message: string;
}

export interface IInputValidateNumberType {
  value: number;
  message: string;
}

export interface IInputValidateParams {
  required?: string;
  pattern?: IInputValidatePattern;
  minLength?: IInputValidateNumberType;
  maxLength?: IInputValidateNumberType;
  validate?: (value: string) => boolean | string;
}

export interface ICustomError extends Error {
  status?: number;
  data?: { errors: Record<string, string> };
}
