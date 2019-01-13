//@flow

import * as React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import _get from "lodash/get";
import { resetFeedback } from "../../redux/store/Feedback/feedback";

type Props = {
  Feedback: {
    message: string
  },
  dispatch: any
};
type State = {};
type Type = "success" | "error" | "warn" | "info";

class Toaster extends React.Component<Props, State> {
  componentDidUpdate = (prevProps: any) => {
    if (prevProps.Feedback !== this.props.Feedback) {
      const { message, errorMessage } = _get(this.props, "Feedback");
      !!message && this.showAlertToaster(message);
      !!errorMessage && this.showAlertToaster(errorMessage, "error");
    }
  };

  showAlertToaster = (message: string, type: Type = "success") => {
    toast[type](message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      onClose: () => this.props.dispatch(resetFeedback())
    });
  };

  render() {
    return <ToastContainer />;
  }
}

export default Toaster;
