import React from 'react'

const Radio = (props) => {
  const { label, name, ...otherProps } = props
  return (
    <div className="radio-wrapper">
      <input className="d-none" id={name} name="radio" type="radio" {...otherProps} />
      <label className="label-icon" htmlFor={name}></label>
      <label className="label-text" htmlFor={name}>{label}</label>
    </div>
  )
}

export default Radio