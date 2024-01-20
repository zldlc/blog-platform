import { useParams } from 'react-router-dom';
import { useGetSingleArticleQuery } from '../../stores/api/blogApi';
import { useAppSelector } from '../../stores/hooks';

import Article from '../../components/Article/Article';
import Spinner from '../../components/UI/Spinner/Spinner';

import Markdown from 'react-markdown';
import Alert from 'antd/es/alert/Alert';

const SingleArticlePage = () => {
  const { user } = useAppSelector((state) => state.user);
  const { slug } = useParams();
  const articleSlug = slug ? slug : '';
  const { data, isError, isLoading } = useGetSingleArticleQuery({
    slug: articleSlug,
    token: user?.user.token || null,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Alert message="Произошла ошибка, попробуйте позже" type="error" />;
  }

  return data ? (
    <Article {...data.article} isSinglePage={true} articleText={data.article.body}>
      <Markdown>{data.article.body}</Markdown>
    </Article>
  ) : null;
};

export default SingleArticlePage;
