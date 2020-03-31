import { Button, Container, FormControl, Select } from "@material-ui/core";
import React from "react";
import { SortOrders } from "../../redux/pagination/paginationActions";

const renderOption = (option, key) => {
  return (
    <option key={key} value={option.value}>
      {option.display}
    </option>
  );
};

export default function SortingPanel(props) {
  return (
    <Container>
      <FormControl variant="outlined">
        <Select
          native
          defaultValue=""
          onChange={e => props.onValueChange(e.target.value)}
        >
          <option value="" disabled>
            Sort by
          </option>
          {props.options.map((option, index) => renderOption(option, index))}
        </Select>
      </FormControl>

      <FormControl variant="outlined">
        <Select
          native
          onChange={e => props.onOrderChange(e.target.value)}
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
        disabled={!props.active}
        onClick={props.onSubmit}
      >
        Apply
      </Button>
    </Container>
  );
}
