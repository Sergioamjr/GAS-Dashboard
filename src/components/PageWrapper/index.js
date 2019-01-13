import Component from './PageWrapper';
import { connect } from "react-redux";

const mapStateToProps = ({ UI }, props) => {
  return {
    ...UI,
    ...props
  };
};

export default connect(mapStateToProps)(Component);