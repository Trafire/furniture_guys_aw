import React, {useEffect, useState, useContext} from 'react';
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import {Link as RouterLink} from "react-router-dom";
import {userServices} from "../services/"
import {Store} from "./Store";

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.primary.main,
  },
  links: {
    margin: "5px",
  },

}));

const NavLinks = (props) => {
  const classes = useStyles();
  return (
    <Link className={classes.links} component={RouterLink} to={props.route}>
      {props.text}
    </Link>
  );
};

export const LoginForm = () => {
  const classes = useStyles();
  const globalState = useContext(Store);
  const {dispatch} = globalState;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const handleLogin = () => {
    userServices.login({username: username, password: password}).then(response => {
      const data = response;
      console.log(data)
      data['type'] = 'LOGIN_SUCCESSFUL';
      dispatch(data);

    }).catch(e => {
      console.log(e);
      setErrorText("Bad Credentials please try again")
    });

  };
  return (

    <Box className={classes.root}>
      <p>{errorText}</p>
      <TextField
        label="Username"
        onChange={event => setUsername(event.target.value)}
      />
      <br/>
      <TextField
        label="Password"
        type="password"
        onChange={event => setPassword(event.target.value)}

      />
      <br/>
      <Button onClick={handleLogin}>Login</Button>
      <NavLinks text="Register" route="/register"/>
    </Box>


  );
};