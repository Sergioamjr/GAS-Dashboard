//@flow
import React from 'react';
import InputWithMask from '../InputMask/InputMask';

type Props = {
  label?: string,
  name: string,
  textarea?: boolean,
  errorMessage?: string,
  hasError?: boolean,
  prefix?: string,
  placeholder?: string,
  mask?: string,
  formatChars?: string,
  disabled: boolean
};

const Input = (props: Props) => {
  const {
    label,
    name,
    textarea,
    errorMessage,
    hasError,
    prefix,
    mask,
    formatChars,
    ...otherProps
  } = props;
  const { placeholder, disabled } = props;
  return (
    <div className='m-bottom-30 input-wrapper'>
      {label && (
        <label htmlFor={name} className='label d-block'>
          {label}
        </label>
      )}

      {mask && (
        <InputWithMask
          {...otherProps}
          name={name}
          id={name}
          mask={mask}
          formatChars={formatChars}
        />
      )}

      {textarea && <textarea {...otherProps} name={name} id={name} />}

      {!mask && !textarea && <input {...otherProps} name={name} id={name} />}

      {hasError && !disabled && (
        <p className='color-danger fs-7 m-top-5 input-wrapper-error'>
          {errorMessage || placeholder}
        </p>
      )}
      {prefix && <span className='float-prefix'>{prefix}</span>}
    </div>
  );
};

export default Input;
