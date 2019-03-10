//@flow
import React from 'react';

type Props = {
  label?: string,
  name: string,
  textarea?: boolean,
  errorMessage?: string,
  hasError?: boolean,
  prefix?: string,
  placeholder?: string
};

const Input = (props: Props) => {
  const {
    label,
    name,
    textarea,
    errorMessage,
    hasError,
    prefix,
    ...otherProps
  } = props;
  const { placeholder } = props;
  return (
    <div className='m-bottom-30 input-wrapper'>
      {label && (
        <label htmlFor={name} className='label d-block'>
          {label}
        </label>
      )}
      {textarea ? (
        <textarea {...otherProps} name={name} id={name} />
      ) : (
        <input {...otherProps} name={name} id={name} />
      )}
      {hasError && (
        <p className='color-danger fs-7 m-top-5 input-wrapper-error'>
          {errorMessage || placeholder}
        </p>
      )}
      {prefix && <span className='float-prefix'>{prefix}</span>}
    </div>
  );
};

export default Input;
