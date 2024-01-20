import { ReactElement } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { logOutUser } from '../../stores/slices/userSlice';

import UserInfo from '../UserInfo/UserInfo';

import { IUserResponse } from '../../types/types';

import style from './Header.module.scss';

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.user);

  const profileNav = (user: IUserResponse | null): ReactElement => {
    if (user) {
      const { username, image } = user.user;
      const userInfo = {
        username,
        image,
      };

      return (
        <div className={style.profile_nav}>
          <Link to={'/new-article'} className={style.create_article_btn}>
            Create article
          </Link>
          <Link to={'/profile'} className={style.edit_profile_btn}>
            <UserInfo author={userInfo} />
          </Link>

          <button
            className={style.log_out_btn}
            onClick={() => {
              dispatch(logOutUser(null));
              navigate('/');
            }}
          >
            Log Out
          </button>
        </div>
      );
    }

    return (
      <div className={style.profile_nav}>
        <button onClick={() => navigate('/sign-in', { state: { from: location } })} className={style.sign_in_btn}>
          Sign In
        </button>
        <button
          onClick={() => {
            navigate('/sign-up', { state: { from: location } });
          }}
          className={style.sign_up_btn}
        >
          Sign Up
        </button>
      </div>
    );
  };

  return (
    <header className={style.header}>
      <Link to={'/'} className={style.logo_btn}>
        Realworld Blog
      </Link>
      {profileNav(user)}
    </header>
  );
};

export default Header;
