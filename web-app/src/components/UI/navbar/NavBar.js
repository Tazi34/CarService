import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router";
import MenuIcon from "@material-ui/icons/Menu";
import { GuestLinks } from "./GuestLinks";
import { UserLinks } from "./UserLinks";
import { LoginLogoutLink } from "./LoginLogoutLink";
import Box from "@material-ui/core/Box";
import { NavBarDrawer } from "./NavBarDrawer";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import AdminSideBar from "../../adminSideMenu/AdminSideBar";

const navBarBreakPoint = 1100;

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  title: {
    cursor: "pointer",
    display: "block",
    margin: "auto",
    [theme.breakpoints.down(450)]: {
      fontSize: "2em"
    },
    [theme.breakpoints.down(300)]: {
      display: "none"
    }
  },
  navItem: {
    color: "white"
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up(navBarBreakPoint)]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up(navBarBreakPoint)]: {
      display: "none"
    }
  },
  toolBar: {
    flexWrap: "wrap"
  },
  appBar: {
    backgroundColor: "transparent",
    maxWidth: "1400px",
    margin: "auto",
    boxShadow: "none",
    paddingTop: "40px",
    [theme.breakpoints.down("md")]: {
      paddingTop: "20px"
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: "10px"
    }
  },
  menuButton: {
    margin: "auto",
    padding: "30px 30px"
  },
  adminButton: {
    margin: "auto",
    color: "white"
  }
}));

const renderNavBarItems = authenticated => {
  return (
    <>
      {authenticated && <UserLinks />}
      <GuestLinks />
      <LoginLogoutLink auth={authenticated} />
    </>
  );
};
export default function NavBar(props) {
  const classes = useStyles();
  const history = useHistory();
  const authenticated = props.auth.user ? true : false;
  const isAdmin =
    authenticated && props.auth.user.roles.some(el => el.name === "ROLE_ADMIN");

  const [mobileSideBar, setMobileSideBar] = useState(false);
  const [adminBar, setAdminBar] = useState(false);

  const handleHomeClick = () => {
    //needed for reload effect
    if (history.location.pathname === "/") {
      history.go(0);
    } else {
      history.push("/");
    }
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          {isAdmin && !adminBar && (
            <IconButton
              variant={"contained"}
              className={classes.adminButton}
              onClick={() => setAdminBar(true)}
            >
              <SupervisorAccountIcon />
            </IconButton>
          )}
          {!isAdmin && (
            <Typography
              className={classes.title}
              variant="h4"
              onClick={handleHomeClick}
            >
              <Box color={"primary.contrastText"}> CarServices</Box>
            </Typography>
          )}

          <div className={classes.grow} />

          <div className={classes.sectionDesktop}>{renderNavBarItems()}</div>

          <div className={classes.sectionMobile}>
            <IconButton
              className={classes.menuButton}
              onClick={() => setMobileSideBar(true)}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {isAdmin && (
        <AdminSideBar open={adminBar} onClose={() => setAdminBar(false)} />
      )}
      <NavBarDrawer
        open={mobileSideBar}
        auth={authenticated}
        onClose={() => setMobileSideBar(false)}
      />
    </div>
  );
}
