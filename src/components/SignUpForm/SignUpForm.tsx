import React from 'react';

import Input from '../UI/Input/Input';

import style from './SignUpForm.module.scss';
import { Link } from 'react-router-dom';

const SignUpForm = () => {
  return (
    <form className={style.form}>
      <h2 className={style.title}>Create new account</h2>
      <div className={style.inputs_block}>
        <label className={style.label}>
          <span className={style.input_title}>Username</span>
          <Input inputType="text" inputPlaceholder="Username" />
        </label>
        <label className={style.label}>
          <span className={style.input_title}>Email address</span>
          <Input inputType="email" inputPlaceholder="Email address" />
        </label>
        <label className={style.label}>
          <span className={style.input_title}>Password</span>
          <Input inputType="password" inputPlaceholder="Password" />
        </label>
        <label className={style.label}>
          <span className={style.input_title}>Repeat Password</span>
          <Input inputType="password" inputPlaceholder="Password" />
        </label>
      </div>
      <label className={style.checkbox_label}>
        <input type="checkbox" className={style.checkbox} />
        <span className={style.customCheckbox} />
        <span className={[style.input_title, style.checkbox_text].join(' ')}>
          I agree to the processing of my personal information
        </span>
      </label>
      <footer className={style.footer}>
        <button className={style.button}>Create</button>
        <span className={style.footer_text}>
          Already have an account?
          <Link to={'/sign-in'} className={[style.footer_text, style.sign_in_link].join(' ')}>
            {' '}
            Sign In.
          </Link>
        </span>
      </footer>
    </form>
  );
};

export default SignUpForm;
