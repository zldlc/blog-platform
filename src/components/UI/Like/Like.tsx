import { useState } from 'react';
import { useAppSelector } from '../../../stores/hooks';
import { useToggleLikeMutation } from '../../../stores/api/blogApi';

import style from './Like.module.scss';

interface ILikeProps {
  likesCount: number;
  favorited: boolean;
  slug: string;
}

const Like = ({ likesCount, favorited, slug }: ILikeProps) => {
  const [toggleLike] = useToggleLikeMutation();
  const [isLike, setIsLike] = useState<boolean>(favorited);
  const { user } = useAppSelector((state) => state.user);

  const onLike = async (): Promise<void> => {
    await toggleLike({
      slug,
      token: user?.user.token || null,
      isLike,
    });

    setIsLike((prevState) => !prevState);
  };

  return (
    <label className={user ? style.label : style.label_disabled}>
      <input type="checkbox" className={style.checkbox} disabled={!user} checked={isLike} onChange={onLike} />
      <span className={style.customCheckbox}></span>
      {likesCount}
    </label>
  );
};

export default Like;
