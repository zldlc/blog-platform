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
  additionalСlasses?: string[];
  value?: string;
  onChange?: (value: string) => void;
}

const Input = ({
  inputType,
  inputPlaceholder,
  inputName = '',
  register,
  validateParams,
  errors,
  additionalСlasses,
  value,
  onChange,
}: IInputProps) => {
  const additionalStyleСlasses = additionalСlasses ? additionalСlasses.map((item) => style[item]) : [];
  const inputBaseClassName = [style.input, ...additionalStyleСlasses];

  if (errors) {
    inputBaseClassName.push(style.input_error);
  }

  return (
    <input
      value={value}
      type={inputType}
      placeholder={inputPlaceholder}
      className={inputBaseClassName.join(' ')}
      {...(register ? register(inputName, validateParams) : {})}
      onChange={onChange ? (e) => onChange(e.target.value) : () => {}}
    />
  );
};

export default Input;
