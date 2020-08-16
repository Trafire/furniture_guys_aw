import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import {makeStyles} from '@material-ui/styles'
import Link from "@material-ui/core/Link";
import {Link as RouterLink} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
  },
  links: {
    color: theme.palette.secondary.main,
    margin: "5px",
  },

}))

const NavLinks = (text, route) => {
  const classes = useStyles();
  return (
    <Link className={classes.links} component={RouterLink} to={route}>
      Home
    </Link>
  );
};
export const Header = () => {
  const classes = useStyles()
  return (
    <div>
      <h1>AFG Jobsite</h1>
      <AppBar className={classes.root} position="static">
        <NavLinks text="Home" route="/Home"/>
        <Link className={classes.links} component={RouterLink} to="/candidates">
          Candidates
        </Link>
        <Link className={classes.links} component={RouterLink} to="/employer">
          Employer
        </Link>
        <Link className={classes.links} component={RouterLink} to="/statistics">
          Statistics
        </Link>
      </AppBar>
    </div>
  )

};


