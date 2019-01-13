import Component from "./CreateDist";
import { connect } from "react-redux";

const mapStateToProps = ({ Feedback }, props) => {
  return {
    Feedback,
    ...props
  };
};

export default connect(mapStateToProps)(Component);
