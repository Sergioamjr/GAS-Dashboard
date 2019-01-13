import Component from "./RestrictPage";
import { withRouter } from "react-router";
import { connect } from "react-redux";

const mapStateToProps = ({ Feedback }, props) => ({ Feedback, ...props });

export default connect(mapStateToProps)(withRouter(Component));
