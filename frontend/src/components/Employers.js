import React, {useContext, useState} from 'react';
import {makeStyles} from '@material-ui/styles'
import Link from "@material-ui/core/Link";
import {Link as RouterLink} from 'react-router-dom';
import Button from "@material-ui/core/Button";
import {Store} from "./Store";
import {LoginForm} from "./Login"
import Box from "@material-ui/core/Box";
import {WritePosting} from "./EmployerCreateMessage";
import {employersServices} from "../services/employers.api";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Checkbox from "@material-ui/core/Checkbox";

export const EmployersPortal = () => {
  const globalState = useContext(Store);
  const {dispatch} = globalState;
  const [loading, setLoading] = useState(true);
  let page = null;
  if (globalState.state.loggedIn === false) {
    page = <LoginForm/>;
  } else {
    page = <div><WritePosting loading={loading} setLoading={setLoading}/><br/><Divider/>
      <EmployerPostings loading={loading} setLoading={setLoading}/></div>;

  }

  return (
    <div>
      <h1>Employer's Page</h1>
      {page}
    </div>
  )

};

const Posting = (props) => {
  const classes = useStyles();
  const globalState = useContext(Store);

  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={props.job.title}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              Company: {props.job.employer.company}
            </Typography>

            <br/>{props.job.description}
            <br/><b>{appliedStr}</b>
          </React.Fragment>
        }
      />

    </ListItem>
  );
};


const ActiveCheckBox = (props) => {
  const [check, setCheck] = useState(props.active);

  const handlechange = () => {
    if (check) {
      employersServices.deactivateListing(props.jobID);
      setCheck(!check);
    } else {
      employersServices.activateListing(props.jobID).then(response => {
        console.log(response);
        if (response['update']) {
          setCheck(!check);
        } else {
          alert("You have too many active ads, please deactivate some in order to activate new ones.")
        }
      });
    }
  };


  return (
    <Checkbox
      checked={check}
      value={check}
      onChange={handlechange}
      inputProps={{'aria-label': 'primary checkbox'}}
    />
  );
}
const EmployerPostings = (props) => {
  const globalState = useContext(Store);
  const {dispatch} = globalState;
  const loading = props.loading;
  const setLoading = props.setLoading;

  const [postings, setPostings] = useState({results: []});
  const company = globalState.state.company;
  if (loading) {
    employersServices.getPostings().then(response => {
      let data = [];
      for (let i = 0; i < response.results.length; i++) {
        if (response.results[i].employer.company == company) {
          data.push(response.results[i]);
        }
      }
      setPostings(data);
      setLoading(false);
    });
  }

  if (loading === true) {
    return (<div>Loading...</div>);
  }

  const listItems = postings.map((job) =>

    <tr style={{paddingBottom: "20px", border: "1px solid black"}}>

      <td>{job.title} </td>
      <td>{job.description} </td>
      <td><ActiveCheckBox active={job.active} jobID={job.id}/></td>
    </tr>
  );

  return (
    <div>
      <h1> Created Postings</h1>
      <table>
        <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Active</th>
        </tr>
        </thead>
        <tbody>
        {listItems}
        </tbody>
      </table>
    </div>
  );

};