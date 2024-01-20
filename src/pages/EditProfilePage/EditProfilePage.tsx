import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useEditUserProfileMutation } from '../../stores/api/blogApi';
import { updateUser } from '../../stores/slices/userSlice';

import Input from '../../components/UI/Input/Input';

import Alert from 'antd/es/alert/Alert';

import { handleEnterPress } from '../../utility/handleEnterPress';
import { showInputErrors } from '../../utility/showInputErrors';

import { ICustomError } from '../../types/types';

import style from '../../components/SignUpForm/Forms.module.scss';

interface IEditProfileForm {
  username: string;
  email: string;
  password?: string;
  image?: string;
}

const EditProfilePage = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [editUserProfile, { data, isSuccess, isError, error }] = useEditUserProfileMutation();
  const customError = error as ICustomError;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditProfileForm>({
    mode: 'onBlur',
    criteriaMode: 'all',
    defaultValues: {
      username: user?.user.username,
      email: user?.user.email,
      image: user?.user.image || '',
    },
  });

  useEffect(() => {
    if (isSuccess) {
      if (data) {
        dispatch(updateUser(data));
        setShowSuccessAlert(true);
      }
    }

    const timeoutId = setTimeout(() => {
      setShowSuccessAlert(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line
  }, [data]);

  const onSubmit: SubmitHandler<IEditProfileForm> = async (data: IEditProfileForm) => {
    const { email, image, password, username } = data;

    const requestObj: IEditProfileForm = {
      username,
      email: email.toLowerCase(),
      image: image || '',
    };

    if (password?.trim()) {
      requestObj.password = password;
    }

    editUserProfile({
      body: { user: requestObj },
      token: user?.user.token || null,
    });
  };

  return (
    <div className={style.edit_form_wrapper}>
      <form className={style.form} onKeyDown={handleEnterPress}>
        <h2 className={style.title}>Edit Profile</h2>
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
            <span className={style.input_title}>New password</span>
            <Input
              inputType="password"
              inputPlaceholder="New password"
              inputName="password"
              register={register}
              validateParams={{
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
            <span className={style.input_title}>Avatar image (url)</span>
            <Input
              inputType="text"
              inputPlaceholder="Avatar image"
              inputName="image"
              register={register}
              validateParams={{
                pattern: {
                  value: /^(http|https|ftp):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i,
                  message: 'URL is not valid',
                },
              }}
              errors={errors.image}
            />
            {showInputErrors(errors.image?.types)}
          </label>
        </div>
        <footer className={style.footer}>
          <button className={style.button} onClick={handleSubmit(onSubmit)}>
            Save
          </button>
        </footer>
      </form>
      {showSuccessAlert ? (
        <Alert type="success" message={'Profile successfully updated'} className={style.success_alert} />
      ) : null}
    </div>
  );
};

export default EditProfilePage;
