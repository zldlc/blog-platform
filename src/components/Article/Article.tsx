import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import TagList from '../UI/TagList/TagList';
import Like from '../UI/Like/Like';

import cutText from '../../utility/cutText';

import { IAuthor } from '../../types/types';

import style from './Article.module.scss';

import UserInfo from '../UserInfo/UserInfo';

interface IArticleProps {
  title: string;
  description: string;
  tagList: string[];
  author: IAuthor;
  favoritesCount: number;
  slug: string;
  createdAt: string;
  children?: ReactElement;
  isSinglePage?: boolean;
}

const Article = ({
  title,
  description,
  favoritesCount,
  tagList,
  author,
  slug,
  createdAt,
  isSinglePage,
  children,
}: IArticleProps) => {
  return (
    <article className={!isSinglePage ? style.article : [style.article, style.single_page_article].join(' ')}>
      <div>
        <header className={style.header}>
          <div>
            <div className={style.title_line}>
              <Link to={`/articles/${slug}`} className={!isSinglePage ? style.title : style.single_page_article_title}>
                {!isSinglePage ? cutText(title, 50) : title}
              </Link>
              <Like likesCount={favoritesCount} />
            </div>
            <TagList tags={tagList} />
          </div>
          <UserInfo author={author} createdAt={createdAt} />
        </header>
        <p className={style.description}>{!isSinglePage ? cutText(description, 160) : description}</p>
      </div>
      {children}
    </article>
  );
};

export default Article;
