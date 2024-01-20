import { Routes, Route } from 'react-router-dom';

import ArticlesListPage from '../../pages/ArticlesListPage/ArticlesListPage';
import Layout from '../../pages/Layout/Layout';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import SingleArticlePage from '../../pages/SingleArticlePage/SingleArticlePage';
import SignUpPage from '../../pages/SignUpPage/SignUpPage';
import SignInPage from '../../pages/SignInPage/SignInPage';
import EditProfilePage from '../../pages/EditProfilePage/EditProfilePage';
import CreateArticlePage from '../../pages/CreateArticlePage/CreateArticlePage';
import EditArticlePage from '../../pages/EditArticlePage/EditArticlePage';
import RequireAuth from '../../hoc/RequireAuth';

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
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <EditProfilePage />
            </RequireAuth>
          }
        />
        <Route
          path="/new-article"
          element={
            <RequireAuth>
              <CreateArticlePage />
            </RequireAuth>
          }
        />
        <Route
          path="/articles/:slug/edit"
          element={
            <RequireAuth>
              <EditArticlePage />
            </RequireAuth>
          }
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
