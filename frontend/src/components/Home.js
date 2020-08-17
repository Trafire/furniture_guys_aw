import React from 'react';
import {makeStyles} from '@material-ui/styles'
import Link from "@material-ui/core/Link";
import {Link as RouterLink} from 'react-router-dom';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    color: theme.palette.primary.main,
    marginTop: "5px",
    justifyContent: "center",
  },
  button: {
    color: theme.palette.secondary.main,
    paddingLeft: "2%",
    paddingRight: "2%",
    margin: "5px",
    border: "solid",
    background: theme.palette.secondary.light,
    '&:hover': {
      background: theme.palette.secondary.main,
    },
  },
  buttonText: {
    color: "white",
  }
}));


export const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button className={classes.button} component={RouterLink} to="/candidates">
        <span className={classes.buttonText}>candidates</span>
      </Button>
      <Button className={classes.button} component={RouterLink} to="/employers">
        <span className={classes.buttonText}> Employers</span>
      </Button>
    </div>
  );
};

