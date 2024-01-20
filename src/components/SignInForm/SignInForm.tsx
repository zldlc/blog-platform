import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSignInUserMutation } from '../../stores/api/blogApi';
import { useAppDispatch } from '../../stores/hooks';
import { loginUser } from '../../stores/slices/userSlice';

import Input from '../UI/Input/Input';

import Alert from 'antd/es/alert/Alert';

import { checkLocation } from '../../utility/checkLocation';
import { showInputErrors } from '../../utility/showInputErrors';
import { handleEnterPress } from '../../utility/handleEnterPress';

import style from '../SignUpForm/Forms.module.scss';

interface ISignInForm {
  email: string;
  password: string;
}

const SignInForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname;
  const dispatch = useAppDispatch();
  const [signInUser, { data, isError, isSuccess }] = useSignInUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ISignInForm>({ mode: 'onBlur', criteriaMode: 'all' });

  useEffect(() => {
    if (isSuccess) {
      if (data) {
        dispatch(loginUser(data));
      }

      navigate(checkLocation('/sign-up', fromPage), { replace: true });
    }
    // eslint-disable-next-line
  }, [data]);

  const onSubmit: SubmitHandler<ISignInForm> = async (user: ISignInForm) => {
    user.email = user.email.toLowerCase();
    await signInUser({ user: user });
  };

  return (
    <form className={style.form} onKeyDown={handleEnterPress}>
      <h2 className={style.title}>Sign In</h2>
      <div className={style.inputs_block}>
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
          {showInputErrors(errors.email?.types)}
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
            }}
            errors={errors.password}
          />
          {showInputErrors(errors.password?.types)}
        </label>
        {isError ? (
          <Alert type="error" message={'Email or password is invalid'} banner className={style.invalid_data_error} />
        ) : null}
      </div>
      <footer className={style.footer}>
        <button className={style.button} onClick={handleSubmit(onSubmit)} disabled={!isValid}>
          Login
        </button>
        <span className={style.footer_text}>
          Don’t have an account?
          <Link
            to={'/sign-up'}
            className={[style.footer_text, style.sign_in_link].join(' ')}
            state={{ from: { pathname: fromPage } }}
          >
            {' '}
            Sign Up.
          </Link>
        </span>
      </footer>
    </form>
  );
};

export default SignInForm;
