import { useGetArticlesQuery } from '../../stores/api/blogApi';
import { useAppSelector } from '../../stores/hooks';

import ArticlesPagination from '../../components/UI/ArticlesPagination/ArticlesPagination';
import Spinner from '../../components/UI/Spinner/Spinner';
import Article from '../../components/Article/Article';

import { Alert } from 'antd';

import style from './ArticleListPage.module.scss';

const ArticlesListPage = () => {
  const { currentPage } = useAppSelector((state) => state.articlesList);
  const { data, isLoading, isError } = useGetArticlesQuery(currentPage * 5 - 5);

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
          ? data.articles.map((article, index) => {
              return <Article key={index} {...article} />;
            })
          : null}
      </ul>
      <ArticlesPagination totalResults={data ? data.articlesCount : 0} />
    </section>
  );
};

export default ArticlesListPage;
