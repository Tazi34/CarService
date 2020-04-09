import React, { Component } from "react";
import { connect } from "react-redux";

import SortingPanel from "./SortingPanel";
import { SortOrders } from "../../utilities/sortOrders";

const mapStateToProps = state => ({
  sorting: state.paginations.carReducer.pagination.sorting
});

class SortingBar extends Component {
  handleFieldChange = value => {
    this.props.onFieldChange(value);
  };
  handleOrderChange = order => {
    this.props.onOrderChange(order);
  };

  render() {
    const { sorting, onSubmit, options } = this.props;
    return (
      <SortingPanel
        onFieldChange={this.handleFieldChange}
        onOrderChange={this.handleOrderChange}
        active={sorting.order !== SortOrders.NOT_SORTED && sorting.field}
        onSubmit={onSubmit}
        options={options}
      />
    );
  }
}

export default connect(mapStateToProps, null)(SortingBar);
