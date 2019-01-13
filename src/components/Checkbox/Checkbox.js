import React from 'react'

const Checkbox = (props) => {
  const { label, name, ...otherProps } = props
  return (
    <div className="checkbox-wrapper">
      <input className="d-none" id={name} name={name} type="checkbox" {...otherProps} />
      <label className="label-icon" htmlFor={name}></label>
      <label className="label-text" htmlFor={name}>{label}</label>
    </div>
  )
}

export default Checkbox