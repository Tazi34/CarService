import * as React from "react";
import { useTheme } from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Box from "@material-ui/core/Box";
import { StatusRow } from "./StatusRow";

const styles = makeStyles(theme => ({
  table: {
    minWidth: 0,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "stretch",
    display: "flex",
    flexDirection: "column",
    padding: "20px 40px 15px 30px",
    borderRadius: 20,
    [theme.breakpoints.down("sm")]: {
      padding: 10
    }
  },
  tableHeadRow: {
    fontWeight: 900
  },
  row: {
    padding: 3
  }
}));

export function StatusTable({
  statuses,
  title,
  pagination,
  handlePageChange,
  handleRowsChange,
  ...props
}) {
  const classes = styles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const renderStatus = status => {
    return <StatusRow status={status} key={status.id} isMobile={isMobile} />;
  };

  return (
    <div className={classes.table} {...props}>
      <div>
        <Typography
          color={"primary"}
          variant={"h4"}
          align={"center"}
          className={classes.title}
        >
          {title}
        </Typography>
        {statuses.map(renderStatus)}
      </div>

      <Box
        display={"flex"}
        justifyContent={isMobile ? "center" : "space-between"}
        alignItems={"center"}
      >
        {isMobile ? (
          <Pagination
            size={"small"}
            count={pagination.totalPages}
            page={pagination.currentPage}
            onChange={handlePageChange}
            style={{ margin: "auto" }}
            siblingCount={0}
            boundaryCount={1}
          />
        ) : (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={pagination.totalElements}
            rowsPerPage={pagination.pageSize}
            page={pagination.currentPage}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsChange}
          />
        )}
      </Box>
    </div>
  );
}
