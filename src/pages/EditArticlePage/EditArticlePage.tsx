import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../stores/hooks';

import ArticleForm from '../../components/ArticleForm/ArticleForm';

const EditArticlePage = () => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.user);

  if (!location.state) {
    location.state = {
      author: { username: '' },
      title: '',
      description: '',
      tagList: [],
      articleText: '',
    };
  }

  if (location.state.author.username !== user?.user.username) {
    return <Navigate to={'/'} />;
  }

  return <ArticleForm data={{ ...location.state }} isEditing={true} />;
};

export default EditArticlePage;
