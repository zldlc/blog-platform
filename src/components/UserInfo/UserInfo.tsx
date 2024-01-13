import React from 'react';

import { format } from 'date-fns';

import { IAuthor } from '../../types/types';

import style from './UserInfo.module.scss';
import defaultAvatar from '../../assets/img/defaultAvatar.png';

interface IUserInfoProps {
  author: IAuthor;
  createdAt?: string;
}

const UserInfo = ({ author, createdAt }: IUserInfoProps) => {
  const publicationDate = createdAt ? (
    <span className={style.publication_date}>{format(new Date(createdAt ? createdAt : ''), 'MMMM d, yyyy')}</span>
  ) : null;

  return (
    <div className={style.author}>
      <div className={style.author_info}>
        <span className={style.username}>{author.username}</span>
        {publicationDate}
      </div>
      <img
        src={author.image ? author.image : defaultAvatar}
        onError={(e) => (e.currentTarget.src = defaultAvatar)}
        alt="user icon"
        className={style.user_icon}
      />
    </div>
  );
};

export default UserInfo;
