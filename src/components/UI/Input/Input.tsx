import React, { FC } from 'react';

import style from './Input.module.scss';

interface IInputProps {
  inputType: string;
  inputPlaceholder?: string;
}

const Input: FC<IInputProps> = ({ inputType, inputPlaceholder }) => {
  return <input type={inputType} placeholder={inputPlaceholder} className={style.input} />;
};

export default Input;
