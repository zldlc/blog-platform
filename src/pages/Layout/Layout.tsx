import { Outlet } from 'react-router-dom';

import Header from '../../components/Header/Header';

import style from './Layout.module.scss';

const Layout = () => {
  return (
    <>
      <Header />
      <main className={style.main}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
