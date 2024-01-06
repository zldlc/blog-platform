import { Link } from 'react-router-dom';

import style from './NotFoundPage.module.scss';
import notFoundImg from '../../assets/img/not-found.png';

const NotFoundPage = () => {
  return (
    <div className={style.wrapper}>
      <img src={notFoundImg} alt="Error 404" className={style.image} />
      <Link to="/" className={style.button}>
        На главную
      </Link>
    </div>
  );
};

export default NotFoundPage;
