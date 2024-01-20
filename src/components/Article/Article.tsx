import { ReactElement, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../stores/hooks';
import { useDeleteAnArticleMutation } from '../../stores/api/blogApi';

import TagList from '../UI/TagList/TagList';
import Like from '../UI/Like/Like';
import UserInfo from '../UserInfo/UserInfo';

import { Popconfirm } from 'antd';

import { cutText } from '../../utility/cutText';

import { IAuthor } from '../../types/types';

import style from './Article.module.scss';

interface IArticleProps {
  title: string;
  description: string;
  tagList: string[];
  author: IAuthor;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  createdAt: string;
  articleText?: string;
  children?: ReactElement;
  isSinglePage?: boolean;
}

const Article = ({
  title,
  description,
  favorited,
  favoritesCount,
  tagList,
  author,
  slug,
  createdAt,
  isSinglePage,
  articleText,
  children,
}: IArticleProps) => {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [deleteArticle, { isSuccess }] = useDeleteAnArticleMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  });

  return (
    <article className={!isSinglePage ? style.article : [style.article, style.single_page_article].join(' ')}>
      <div>
        <header className={!isSinglePage ? style.header : [style.header, style.single_page_header].join(' ')}>
          <div>
            <div className={style.title_line}>
              <Link to={`/articles/${slug}`} className={!isSinglePage ? style.title : style.single_page_article_title}>
                {!isSinglePage ? cutText(title, 50) : title}
              </Link>
              <Like likesCount={favoritesCount} favorited={favorited} slug={slug} />
            </div>
            <TagList tags={tagList} />
          </div>
          <UserInfo author={author} createdAt={createdAt} />
        </header>
        {isSinglePage && author.username === user?.user.username ? (
          <div className={style.description_block}>
            <p className={style.description}>{!isSinglePage ? cutText(description, 160) : description}</p>
            <div className={style.article_btn_block}>
              <Popconfirm
                title="Are you sure to delete this article?"
                onConfirm={() => deleteArticle({ slug, token: user.user.token })}
                placement="rightTop"
                okText="Yes"
                cancelText="No"
              >
                <button className={style.delete_article_btn}>Delete</button>
              </Popconfirm>
              <Link
                to={`/articles/${slug}/edit`}
                state={{ author, title, description, tagList, articleText, slug }}
                className={style.edit_article_btn}
              >
                Edit
              </Link>
            </div>
          </div>
        ) : (
          <p className={style.description}>{!isSinglePage ? cutText(description, 160) : description}</p>
        )}
      </div>
      {children}
    </article>
  );
};

export default Article;
