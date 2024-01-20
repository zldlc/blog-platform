interface IToken {
  token: string | null;
}

interface ILoggedUser extends IToken {
  email: string;
  username: string;
  image: string | null;
}

export interface IAuthor {
  username: string;
  image: string | null;
}

interface IArticle {
  title: string;
  description: string;
  body?: string;
  tagList: string[];
  author: IAuthor;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  createdAt: string;
}

export interface IArticleBody {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  };
}

export interface IArticlesResponse {
  articles: IArticle[];
  articlesCount: number;
}

export interface ISingleArticleResponse {
  article: IArticle;
}

export interface IUserResponse {
  user: ILoggedUser;
}

export interface IRegistrationUserRequest {
  user: {
    username: string;
    email: string;
    password: string;
  };
}

export interface ILoginUserRequest {
  user: {
    email: string;
    password: string;
  };
}

export interface IArticlesRequest extends IToken {
  offset: number;
}

export interface IEditProfileRequest extends IToken {
  body: editProfileBodyType;
}

export interface IUpdateArticleRequest extends IToken {
  body: IArticleBody;
  slug: string;
}

export interface ICreateArticleRequest extends IToken {
  body: IArticleBody;
}

export interface IDeleteArticleRequest extends IToken {
  slug: string;
}

export interface IToggleLikeRequest extends IToken {
  slug: string;
  isLike: boolean;
}

export interface IInputValidateParams {
  required?: string;
  pattern?: IInputValidatePatternType;
  minLength?: IInputValidateNumberType;
  maxLength?: IInputValidateNumberType;
  validate?: (value: string) => boolean | string;
}

export interface ICustomError extends Error {
  status?: number;
  data?: { errors: Record<string, string> };
}

// Types

type IInputValidatePatternType = {
  value: RegExp;
  message: string;
};

type IInputValidateNumberType = {
  value: number;
  message: string;
};

type editProfileBodyType = {
  user: {
    username: string;
    email: string;
    password?: string | null;
    image?: string | null;
  };
};
