//@flow

import * as React from "react";

type Props = {
  title?: string,
  children: any
};
type State = {};

class Modal extends React.Component<Props, State> {
  render() {
    const { title, children } = this.props;
    return (
      <div className="modal d-flex">
        <div className="modal-wrapper w-100 p-20">
          {title && (
            <h2 className="fw-300 p-center fs-5 m-bottom-20">{title}</h2>
          )}
          {children}
        </div>
      </div>
    );
  }
}

export default Modal;
