import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import BlockIcon from "@material-ui/icons/Block";
import DeleteIcon from "@material-ui/icons/Delete";
import { ConfirmationDialog } from "../confirmationDialog/ConfirmationDialog";
import Dialog from "@material-ui/core/Dialog";
import { BlockCarForm } from "../blockCarForm/BlockCarForm";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

export default function CarActionMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [confirmationDialog, setConfirmationDialog] = React.useState(false);
  const [blockCarDialog, setBlockCarDialog] = React.useState(false);
  const { car, blockCar, deleteCar } = props;
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRejection = () => {
    setConfirmationDialog(false);
    handleClose();
  };
  const handleConfirmation = () => {
    deleteCar(car);
    setConfirmationDialog(false);
    handleClose();
  };

  const handleBlockCarSubmission = values => {
    blockCar(car, values);
    setBlockCarDialog(false);
    handleClose();
  };
  return (
    <div>
      <ConfirmationDialog
        onClose={handleRejection}
        open={confirmationDialog}
        onConfirmation={handleConfirmation}
        onRejection={handleRejection}
      />
      <Dialog onClose={() => setBlockCarDialog(false)} open={blockCarDialog}>
        <BlockCarForm
          onSubmit={handleBlockCarSubmission}
          onBack={() => setBlockCarDialog(false)}
        />
      </Dialog>
      <KeyboardArrowDownIcon color="primary" onClick={handleClick} />
      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={() => setBlockCarDialog(true)}>
          <ListItemIcon>
            <BlockIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Block" />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => setConfirmationDialog(true)}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
