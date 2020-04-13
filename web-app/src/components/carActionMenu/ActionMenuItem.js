import React, { Component } from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { StyledMenuItem } from "../UI/StyledMenuItem";

export class ActionMenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClose = () => {
    this.setState({ open: false });
    this.props.onClose();
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleSubmit = () => {
    this.handleClose();
    this.props.onSubmit();
  };

  render() {
    const { title, icon, render } = this.props;
    const Icon = icon;
    return (
      <>
        <StyledMenuItem onClick={this.handleOpen}>
          <ListItemIcon>
            <Icon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={title} />
        </StyledMenuItem>
        {render({
          handleSubmit: this.handleSubmit,
          handleClose: this.handleClose,
          isOpen: this.state.open
        })}
      </>
    );
  }
}
