import React from "react";
import { CardActions } from "@material-ui/core";
import { connect } from "react-redux";
import BookCarButton from "../actions/BookCarButton";

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

const CarCardBookActions = props => {
  return (
    <CardActions>
      <BookCarButton car={props.car} />
    </CardActions>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(CarCardBookActions);
