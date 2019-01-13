import React from "react";

const mountClassNames = props => {
  const {
    className = "",
    small,
    icon,
    type,
    circle,
    noborder,
    ...otherProps
  } = props;

  let btnClassName = `btn ${className}`;

  type && (btnClassName = `btn-${type} ${btnClassName}`);
  icon && (btnClassName = `btn-icon ${btnClassName}`);
  small && (btnClassName = `btn-small ${btnClassName}`);
  circle && (btnClassName = `btn-circle ${btnClassName}`);
  noborder && (btnClassName = `btn-noborder ${btnClassName}`);

  return { className: btnClassName, otherProps };
};

const Button = props => {
  const { className, otherProps } = mountClassNames(props);
  const { children, disabled, loading } = otherProps;
  return (
    <button
      {...otherProps}
      disabled={disabled || loading}
      className={className}
    >
      {children}
      {!!loading && <i className="m-left-10 fas fa-sync rotate" />}
    </button>
  );
};

export default Button;
