import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchStatusPage,
  resetStatusPagination,
  setStatusCurrentPage,
  setStatusPageSize
} from "../../redux/status/statusReducer";
import CircularProgress from "@material-ui/core/CircularProgress";
import { StatusTable } from "./StatusTable";
import Paper from "@material-ui/core/Paper";

function mapStateToProps(state) {
  return {
    statuses: state.paginations.statusReducer.statuses,
    pagination: state.paginations.statusReducer.pagination
  };
}

const mapDispatchToProps = {
  setRowsPerPage: setStatusPageSize,
  fetchStatusPage: fetchStatusPage,
  setPage: setStatusCurrentPage,
  resetPages: resetStatusPagination
};

class StatusTableContainer extends Component {
  componentDidMount() {
    this.props.fetchStatusPage({
      pageNo: 0,
      size: this.props.pagination.pageSize,
      sortField: "dateFrom",
      sortOrder: "DESC"
    });
  }

  handleChangePage = (event, newPage) => {
    const { pagination, setPage } = this.props;
    //IF NOT FETCHED
    if (!pagination.pages[newPage]) {
      this.props.fetchStatusPage({
        pageNo: newPage,
        size: pagination.pageSize,
        sortField: "dateFrom",
        sortOrder: "DESC"
      });
    }
    setPage(newPage);
  };

  handleChangeRowsPerPage = event => {
    const rowsPerPage = parseInt(event.target.value, 10);
    this.props.resetPages();
    this.props.setRowsPerPage(rowsPerPage);
    this.props.fetchStatusPage({
      pageNo: 0,
      size: rowsPerPage
    });
  };

  render() {
    const { statuses, pagination } = this.props;
    const fetched =
      pagination.pages[0] && !pagination.pages[pagination.currentPage].fetching;
    if (!fetched) {
      return (
        <Paper
          style={{
            minHeight: "70vh",
            display: "flex"
          }}
        >
          <CircularProgress />
        </Paper>
      );
    }

    const currentPage = pagination.pages[pagination.currentPage];
    const statusesItems = currentPage.ids.map(id => statuses[id]);
    return (
      <Paper
        style={{
          minHeight: "70vh",
          display: "flex"
        }}
      >
        <StatusTable
          handlePageChange={this.handleChangePage}
          handleRowsChange={this.handleChangeRowsPerPage}
          statuses={statusesItems}
          pagination={pagination}
        />
      </Paper>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusTableContainer);
