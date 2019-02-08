import React from "react";

class FormGroup extends React.Component {
  render() {
    const { children, title, formName } = this.props;

    return (
      <div className="form-section m-bottom-15 w-100">
        <div className="d-flex d-flex-space-between form-section-title">
          <h3 className="fs-8 p-15 ">{title}</h3>
        </div>
        <form className={`form-section-content`}>
          <fieldset name={formName || title} className="no-border">
            {children}
          </fieldset>
        </form>
      </div>
    );
  }
}

export default FormGroup;
