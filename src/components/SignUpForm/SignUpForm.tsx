import React, { useEffect } from 'react';
import { useSignUpUserMutation } from '../../stores/api/blogApi';
import { useAppDispatch } from '../../stores/hooks';
import { registerUser } from '../../stores/slices/userSlice';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Input from '../UI/Input/Input';

import { Alert } from 'antd';

import { checkLocation } from '../../utility/checkLocation';
import { showInputErrors } from '../../utility/showInputErrors';
import { handleEnterPress } from '../../utility/handleEnterPress';

import { ICustomError } from '../../types/types';

import style from './Forms.module.scss';

interface IFormInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreePolicy: boolean;
}

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname;
  const [signUpUser, { data, isError, error, isSuccess }] = useSignUpUserMutation();
  const customError = error as ICustomError;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm<IFormInput>({ mode: 'onBlur', criteriaMode: 'all' });
  const password = watch('password');

  useEffect(() => {
    if (isSuccess) {
      if (data) {
        dispatch(registerUser(data));
      }

      navigate(checkLocation('/sign-in', fromPage), { replace: true });
      reset();
    }
    // eslint-disable-next-line
  }, [data]);

  const onSubmit: SubmitHandler<IFormInput> = async (user) => {
    user.email = user.email.toLowerCase();
    await signUpUser({ user: user });
  };

  return (
    <div className={style.form}>
      <form className={style.main} onKeyDown={handleEnterPress}>
        <h2 className={style.title}>Create new account</h2>
        <div className={style.inputs_block}>
          <label className={style.label}>
            <span className={style.input_title}>Username</span>
            <Input
              inputType="text"
              inputPlaceholder="Username"
              inputName="username"
              register={register}
              validateParams={{
                required: 'Field is required',
                minLength: {
                  value: 3,
                  message: 'Minimum username length - 3',
                },
                maxLength: {
                  value: 20,
                  message: 'Maximum username length - 20',
                },
              }}
              errors={errors.username}
            />
            {isError && customError.data?.errors.username ? (
              <Alert type="error" message={customError.data?.errors.username} banner />
            ) : (
              showInputErrors(errors.username?.types)
            )}
          </label>
          <label className={style.label}>
            <span className={style.input_title}>Email address</span>
            <Input
              inputType="email"
              inputPlaceholder="Email address"
              inputName="email"
              register={register}
              validateParams={{
                required: 'Field is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Email is not valid',
                },
              }}
              errors={errors.email}
            />
            {isError && customError.data?.errors.email ? (
              <Alert type="error" message={customError.data?.errors.email} banner />
            ) : (
              showInputErrors(errors.email?.types)
            )}
          </label>
          <label className={style.label}>
            <span className={style.input_title}>Password</span>
            <Input
              inputType="password"
              inputPlaceholder="Password"
              inputName="password"
              register={register}
              validateParams={{
                required: 'Field is required',
                minLength: {
                  value: 6,
                  message: 'Minimum password length - 6',
                },
                maxLength: {
                  value: 40,
                  message: 'Maximum password length - 40',
                },
              }}
              errors={errors.password}
            />
            {showInputErrors(errors.password?.types)}
          </label>
          <label className={style.label}>
            <span className={style.input_title}>Repeat Password</span>
            <Input
              inputType="password"
              inputPlaceholder="Password"
              inputName="confirmPassword"
              register={register}
              validateParams={{
                validate: (value) => value === password || 'Passwords must match',
              }}
              errors={errors.confirmPassword}
            />
            {showInputErrors(errors.confirmPassword?.types)}
          </label>
        </div>
        <label className={style.checkbox_label}>
          <div className={style.agree_policy}>
            <input
              type="checkbox"
              className={style.checkbox}
              {...register('agreePolicy', {
                required: 'Consent to data processing is required',
              })}
            />
            <span className={style.customCheckbox} />
            <span className={[style.input_title, style.checkbox_text].join(' ')}>
              I agree to the processing of my personal information
            </span>
          </div>
          {showInputErrors(errors.agreePolicy?.types)}
        </label>
      </form>
      <footer className={style.footer}>
        <button className={style.button} onClick={handleSubmit(onSubmit)} disabled={!isValid}>
          Create
        </button>
        <span className={style.footer_text}>
          Already have an account?
          <Link to={'/sign-in'} className={[style.footer_text, style.sign_in_link].join(' ')}>
            {' '}
            Sign In.
          </Link>
        </span>
      </footer>
    </div>
  );
};

export default SignUpForm;
