import Component from "./Profile";
import { connect } from "react-redux";

const mapStateToProps = ({ Feedback }, props) => ({ Feedback, ...props });

export default connect(mapStateToProps)(Component);
