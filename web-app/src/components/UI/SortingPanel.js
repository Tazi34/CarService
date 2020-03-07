import { Button, Container, FormControl, Select } from "@material-ui/core";
import React from "react";
import { SortOrders } from "../../redux/pagination/paginationActions";

export default function SortingPanel(props) {
  return (
    <Container>
      <FormControl variant="outlined">
        <Select
          native
          defaultValue=""
          onChange={e => props.fieldChanged(e.target.value)}
          // onChange={(event) => this.props.setSorting(event.target.value, sorting.order)}
        >
          <option value="" disabled>
            Sort by
          </option>
          {props.fieldOptions}
        </Select>
      </FormControl>

      <FormControl variant="outlined">
        <Select
          native
          onChange={e => props.orderChanged(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>
            Sort order
          </option>
          <option value={SortOrders.ASC}>{SortOrders.ASC}</option>
          <option value={SortOrders.DESC}>{SortOrders.DESC}</option>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        disabled={props.buttonDisabled}
        onClick={() => props.applyHandler()}
      >
        Apply
      </Button>
    </Container>
  );
}
