import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = props => {
  const { label, value: selected = new Date(), ...otherProps } = props;
  return (
    <div className="m-bottom-20">
      {label && <label className="label d-block">{label}:</label>}
      <DatePicker {...otherProps} selected={selected} dateFormat="dd/MM/yyyy" />
    </div>
  );
};

export default DatePickerComponent;
