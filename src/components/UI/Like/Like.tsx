import { useAppSelector } from '../../../stores/hooks';

import style from './Like.module.scss';

interface ILikeProps {
  likesCount: number;
}

const Like = ({ likesCount }: ILikeProps) => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <label className={user ? style.label : style.label_disabled}>
      <input type="checkbox" className={style.checkbox} disabled={!user} />
      <span className={style.customCheckbox}></span>
      {likesCount}
    </label>
  );
};

export default Like;
