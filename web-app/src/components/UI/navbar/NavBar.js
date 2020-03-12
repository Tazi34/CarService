import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { Redirect } from "react-router-dom/";
import { useHistory } from "react-router";

import { GuestLinks } from "./GuestLinks";
import { UserLinks } from "./UserLinks";
import { LoginLogoutLink } from "./LoginLogoutLink";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    cursor: "pointer",
    display: "none",
    fontFamily: "Playfair Display",
    [theme.breakpoints.up("300")]: {
      display: "block"
    }
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  navItem: {
    color: "white"
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  bar: {
    padding: "20px"
  }
}));

export default function NavBar(props) {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const renderNavBarItems = () => {
    const user = props.auth.user;
    const authenticated = user != null;

    return (
      <Grid container spacing={4}>
        {authenticated && <UserLinks />}
        <GuestLinks />
        <LoginLogoutLink auth={authenticated} />
      </Grid>
    );
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.bar}>
        <Toolbar>
          <Typography
            className={classes.title}
            variant="h4"
            noWrap
            onClick={() => {
              if (history.location.pathname === "/") history.go(0);
              else history.push("/");
            }}
          >
            CarServices
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {renderNavBarItems()}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
