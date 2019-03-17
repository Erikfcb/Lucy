import { createTable } from "../../Helpers";
import { connect } from "react-redux";
import { TOGGLE_LARGE_IMAGE } from "../../actions/types";
import "./Table.css";

const Table = props => {
  return createTable(props.activeFilters, props.enlargeImage);
};

function mapStateToProps({ activeFilters }) {
  return { activeFilters };
}

function mapDispatchToProps(dispatch) {
  return {
    enlargeImage: link => {
      dispatch({
        type: TOGGLE_LARGE_IMAGE,
        payload: link
      });
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
