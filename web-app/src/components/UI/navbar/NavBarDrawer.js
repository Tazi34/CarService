import React from "react";
import { Drawer } from "@material-ui/core";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import { UserLinks } from "./UserLinks";
import { LoginLogoutLink } from "./LoginLogoutLink";
import { NavBarLink } from "./NavBarLink";
import { homePage } from "../../../utilities/urls/pages";

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

export const NavBarDrawer = ({ auth, onClose, ...props }) => {
  const classes = useStyles();

  const renderItems = () => {
    return (
      <>
        <NavBarLink to={homePage} {...props}>
          HOME
        </NavBarLink>
        {auth && <UserLinks />}
        <LoginLogoutLink auth={auth} />
      </>
    );
  };

  return (
    <Drawer anchor={"right"} {...props}>
      <div onKeyPress={onClose} onClick={onClose}>
        <List className={classes.list} direction={"column"}>
          {renderItems()}
        </List>
      </div>
    </Drawer>
  );
};
