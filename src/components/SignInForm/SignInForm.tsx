import Input from '../UI/Input/Input';

import { Link } from 'react-router-dom';

import style from '../SignUpForm/SignUpForm.module.scss';

const SignInForm = () => {
  return (
    <form className={style.form}>
      <h2 className={style.title}>Sign In</h2>
      <div className={style.inputs_block}>
        <label className={style.label}>
          <span className={style.input_title}>Email address</span>
          <Input inputType="email" inputPlaceholder="Email address" />
        </label>
        <label className={style.label}>
          <span className={style.input_title}>Password</span>
          <Input inputType="password" inputPlaceholder="Password" />
        </label>
      </div>
      <footer className={style.footer}>
        <button className={style.button}>Login</button>
        <span className={style.footer_text}>
          Don’t have an account?
          <Link to={'/sign-up'} className={[style.footer_text, style.sign_in_link].join(' ')}>
            {' '}
            Sign Up.
          </Link>
        </span>
      </footer>
    </form>
  );
};

export default SignInForm;
