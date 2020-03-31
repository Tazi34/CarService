import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setSortField,
  setSortOrder,
  SortOrders
} from "../../redux/pagination/paginationActions";
import SortingPanel from "./SortingPanel";

const mapStateToProps = state => ({
  sorting: state.cars.pagination.sorting
});

const mapDispatchToProps = {
  setSortField: setSortField,
  setSortOrder: setSortOrder
};

class SortingBar extends Component {
  onValueChange = value => {
    this.props.setSortField(value);
  };
  onOrderChange = order => {
    this.props.setSortOrder(order);
  };

  render() {
    const { sorting, onSubmit, options } = this.props;
    return (
      <SortingPanel
        onValueChange={this.onValueChange}
        onOrderChange={this.onOrderChange}
        active={sorting.order != SortOrders.NOT_SORTED && sorting.field}
        onSubmit={onSubmit}
        options={options}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SortingBar);
