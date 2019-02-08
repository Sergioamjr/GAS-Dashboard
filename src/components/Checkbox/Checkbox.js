import React from "react";

const Checkbox = props => {
  const { label, name, onChange, ...otherProps } = props;
  return (
    <div className="checkbox-wrapper">
      <input
        className="d-none"
        id={name}
        name={name}
        onChange={e => {
          const isChecked = document.getElementById(name).checked;
          onChange({ target: { name, value: isChecked } });
        }}
        type="checkbox"
        {...otherProps}
      />
      <label className="label-icon" htmlFor={name} />
      <label className="label-text" htmlFor={name}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
