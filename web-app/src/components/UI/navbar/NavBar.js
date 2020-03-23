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
  }
}));

export default function NavBar(props) {
  const classes = useStyles();
  const history = useHistory();
  const authenticated = props.auth.user ? true : false;

  const [drawer, setDrawer] = useState(false);

  const handleHomeClick = () => {
    //needed for reload effect
    if (history.location.pathname === "/") history.go(0);
    else history.push("/");
  };
  const renderNavBarItems = () => {
    return (
      <>
        {authenticated && <UserLinks />}
        <GuestLinks />
        <LoginLogoutLink auth={authenticated} />
      </>
    );
  };
  const closeDrawer = () => {
    setDrawer(false);
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Typography
            className={classes.title}
            variant="h4"
            onClick={handleHomeClick}
          >
            <Box color={"primary.contrastText"}> CarServices</Box>
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>{renderNavBarItems()}</div>
          <div className={classes.sectionMobile}>
            <IconButton
              className={classes.menuButton}
              onClick={() => setDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <NavBarDrawer open={drawer} auth={authenticated} onClose={closeDrawer} />
    </div>
  );
}
