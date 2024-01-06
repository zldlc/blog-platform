import React, { FC, useState } from 'react';

import style from './Like.module.scss';

interface ILikeProps {
  likesCount: number;
}

const Like: FC<ILikeProps> = ({ likesCount }) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  return (
    <label className={isLogin ? style.label : style.label_disabled}>
      <input type="checkbox" className={style.checkbox} disabled={!isLogin} />
      <span className={style.customCheckbox}></span>
      {likesCount}
    </label>
  );
};

export default Like;
