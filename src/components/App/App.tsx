import { Routes, Route } from 'react-router-dom';

import ArticlesListPage from '../../pages/ArticlesListPage/ArticlesListPage';
import Layout from '../../pages/Layout/Layout';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import SingleArticlePage from '../../pages/SingleArticlePage/SingleArticlePage';

import './App.scss';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<ArticlesListPage />} />
        <Route path="/articles" element={<ArticlesListPage />} />
        <Route path="/articles/:slug" element={<SingleArticlePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
