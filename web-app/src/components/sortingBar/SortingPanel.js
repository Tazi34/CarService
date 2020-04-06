import { Button, Select } from "@material-ui/core";
import React from "react";

import Grid from "@material-ui/core/Grid";
import { SortOrders } from "../../utilities/sortOrders";

const renderOption = (option, key) => {
  return (
    <option key={key} value={option.value}>
      {option.display}
    </option>
  );
};

export default function SortingPanel(props) {
  return (
    <div style={{ margin: "10px 20px" }}>
      <Grid spacing={2} container justify={"flex-end"} alignItems={"center"}>
        <Grid item xs={6} sm={"auto"}>
          <Select
            fullWidth={true}
            variant={"outlined"}
            native
            defaultValue=""
            onChange={e => props.onValueChange(e.target.value)}
          >
            <option value="" disabled>
              By
            </option>
            {props.options.map((option, index) => renderOption(option, index))}
          </Select>
        </Grid>
        <Grid item xs={6} sm={"auto"}>
          <Select
            fullWidth={true}
            native
            variant={"outlined"}
            onChange={e => props.onOrderChange(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Order
            </option>
            <option value={SortOrders.ASC}>{"Asc"}</option>
            <option value={SortOrders.DESC}>{"Desc"}</option>
          </Select>
        </Grid>
        <Grid item xs={12} sm={"auto"}>
          <Button
            fullWidth={true}
            variant="contained"
            color={"primary"}
            size={"large"}
            disabled={!props.active}
            onClick={props.onSubmit}
          >
            Apply
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
