import { ReactElement } from 'react';
import { MultipleFieldErrors } from 'react-hook-form';

import Alert from 'antd/es/alert/Alert';

export const showInputErrors = (errorsTypes?: MultipleFieldErrors): ReactElement[] | null => {
  if (!errorsTypes) return null;

  return Object.entries(errorsTypes).map(([type, message]) => (
    <Alert key={type} type="error" message={`${message}`} banner />
  ));
};
