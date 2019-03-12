// @flow

import React from 'react';
import Input from '../Input/Input';
import InputMask from 'react-input-mask';

type Props = {
  disabled?: boolean
};

const InputWithMask = (props: Props) => {
  const { disabled } = props;
  return (
    <InputMask maskChar='' {...props}>
      {inputProps => {
        return <Input {...inputProps} disabled={disabled} />;
      }}
    </InputMask>
  );
};

export default InputWithMask;
