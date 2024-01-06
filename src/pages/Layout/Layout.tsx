import { Outlet, Link } from 'react-router-dom';

import style from './Layout.module.scss';

const Layout = () => {
  return (
    <>
      <header className={style.header}>
        <Link to={'/'} className={style.logo_btn}>
          Realworld Blog
        </Link>
        <div className={style.profile_nav}>
          <Link to={'/sign-in'} className={style.sign_in_btn}>
            Sign In
          </Link>
          <Link to={'/sign-up'} className={style.sign_up_btn}>
            Sign Up
          </Link>
        </div>
      </header>
      <main className={style.main}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
