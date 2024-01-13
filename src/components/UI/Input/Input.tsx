import { UseFormRegister, FieldError } from 'react-hook-form';

import { IInputValidateParams } from '../../../types/types';

import style from './Input.module.scss';

interface IInputProps {
  inputType: string;
  inputPlaceholder?: string;
  inputName?: string;
  register?: UseFormRegister<any>;
  validateParams?: IInputValidateParams;
  errors?: FieldError;
}

const Input = ({ inputType, inputPlaceholder, inputName = '', register, validateParams, errors }: IInputProps) => {
  return (
    <input
      type={inputType}
      placeholder={inputPlaceholder}
      className={!errors ? style.input : [style.input, style.input_error].join(' ')}
      {...(register ? register(inputName, validateParams) : {})}
    />
  );
};

export default Input;
