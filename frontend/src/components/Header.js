import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import {makeStyles} from '@material-ui/styles'
import Link from "@material-ui/core/Link";
import {Link as RouterLink} from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  root:{
    color: theme.palette.primary.main,
  },
  bar: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.palette.secondary.main,
  },
  links: {
    color: "white",
    margin: "5px",
  },

}))

const NavLinks = (props) => {
  const classes = useStyles();
  return (
    <Link className={classes.links} component={RouterLink} to={props.route}>
      {props.text}
    </Link>
  );
};
export const Header = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <h1>AFG Jobsite</h1>
      <AppBar className={classes.bar} position="static">
        <NavLinks text="Home" route="/"/>
        <NavLinks text="Candidates" route="/candidates"/>
        <NavLinks text="Employer" route="/employers"/>
        <NavLinks text="Statistics" route="/statistics"/>
      </AppBar>
    </div>
  )

};


