import Component from "./Header";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
const mapStateToProps = ({ User }, props) => {
  return {
    User,
    ...props
  };
};
export default connect(mapStateToProps)(withRouter(Component));
