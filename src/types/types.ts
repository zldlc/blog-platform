export interface IGettedArticles {
  articles: IArticle[];
  articlesCount: number;
}

export interface IGettedSinfleArticle {
  article: IArticle;
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
  image: string;
}
