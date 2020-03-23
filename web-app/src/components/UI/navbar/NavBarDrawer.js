import React from "react";
import { Drawer } from "@material-ui/core";
import { GuestLinks } from "./GuestLinks";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import { UserLinks } from "./UserLinks";
import { LoginLogoutLink } from "./LoginLogoutLink";

const useStyles = makeStyles(theme => ({
  list: {
    margin: "auto",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.9)",

    backgroundImage:
      'url("https://www.transparenttextures.com/patterns/always-grey.png")',
    height: "100vh"
  }
}));

export const NavBarDrawer = props => {
  const classes = useStyles();
  const authenticated = props.auth;

  const renderItems = () => {
    return (
      <>
        {authenticated && <UserLinks />}
        <GuestLinks />
        <LoginLogoutLink auth={authenticated} />
      </>
    );
  };

  return (
    <Drawer anchor={"right"} {...props}>
      <div onKeyPress={props.onClose} onClick={props.onClose}>
        <List className={classes.list} direction={"column"}>
          {renderItems()}
        </List>
      </div>
    </Drawer>
  );
};
