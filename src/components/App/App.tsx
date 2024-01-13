import { Routes, Route } from 'react-router-dom';

import ArticlesListPage from '../../pages/ArticlesListPage/ArticlesListPage';
import Layout from '../../pages/Layout/Layout';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import SingleArticlePage from '../../pages/SingleArticlePage/SingleArticlePage';
import SignUpPage from '../../pages/SignUpPage/SignUpPage';
import SignInPage from '../../pages/SignInPage/SignInPage';
import EditProfilePage from '../../pages/EditProfilePage/EditProfilePage';

import './App.scss';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<ArticlesListPage />} />
        <Route path="/articles" element={<ArticlesListPage />} />
        <Route path="/articles/:slug" element={<SingleArticlePage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/profile" element={<EditProfilePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;

// Объединить все формы в одну папку и сделать общие стили

// функция рандомизации id, приватные роуты
