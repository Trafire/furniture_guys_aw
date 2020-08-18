import React, {useState} from 'react';
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import {userServices} from "../services";
import { Link as RouterLink } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: 'column',
    color: theme.palette.primary.main,
    marginTop: "5px",
    justifyContent: "center",
    width: "50%",
  },
  input: {
    padding: '5px',
  },
  button: {
    color: theme.palette.primary.main,
  },
}));

export const Register = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUserName] = useState('')
  const sendRegistration = () => {
    userServices.createUser({email:email,password:password,username:username});
  };
  return (
    <div>
      <h1>Register</h1>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField onChange={(e) => setUserName(e.target.value)} className={classes.input} label="Company Name" variant="outlined"/>
        <TextField onChange={(e) => setEmail(e.target.value)} className={classes.input} label="Email" variant="outlined"/>
        <TextField onChange={(e) => setPassword(e.target.value)} className={classes.input} label="Password" variant="outlined"
                   type="password"/>
        <Button onClick={sendRegistration} className={classes.button} component={RouterLink} to="/employers">Register</Button>

      </form>
    </div>
  );
};