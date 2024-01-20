import { useGetArticlesQuery } from '../../stores/api/blogApi';
import { useAppSelector } from '../../stores/hooks';

import ArticlesPagination from '../../components/UI/ArticlesPagination/ArticlesPagination';
import Spinner from '../../components/UI/Spinner/Spinner';
import Article from '../../components/Article/Article';

import { Alert } from 'antd';

import { randomizeId } from '../../utility/randomizeId';

import style from './ArticleListPage.module.scss';

const ArticlesListPage = () => {
  const { currentPage } = useAppSelector((state) => state.articlesList);
  const { user } = useAppSelector((state) => state.user);
  const { data, isLoading, isError } = useGetArticlesQuery({
    offset: currentPage * 5 - 5,
    token: user?.user.token || null,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Alert message="Произошла ошибка, попробуйте позже" type="error" />;
  }

  return (
    <section className={style.articles_list_section}>
      <ul className={style.article_list}>
        {data
          ? data.articles.map((article) => {
              return <Article key={randomizeId()} {...article} />;
            })
          : null}
      </ul>
      <ArticlesPagination totalResults={data ? data.articlesCount : 0} />
    </section>
  );
};

export default ArticlesListPage;
