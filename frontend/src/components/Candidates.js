import React, {useEffect, useState, useContext} from 'react';
import {makeStyles} from '@material-ui/styles'
import Button from "@material-ui/core/Button";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {candidatesServices} from '../services/index'
import {Store} from './Store.js';

import Box from "@material-ui/core/Box";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',

    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));


const ApplyButton = (props) => {
  const globalState = useContext(Store);
  const {dispatch} = globalState;
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleClickOpen = () => {
    if (globalState.state.email === null) {
      setOpen(true);
    } else {
      addApplication(globalState.state.id);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const addApplication = (id) => {
    candidatesServices.addApplication({candidate: id, posting: props.jobID}).then(response => {
      console.log(response);
      const data = response;
      data['type'] = 'UPDATE_CANDIDATE_APPLICATIONS';
      dispatch(data)
    })
  };

  const saveCandidate = (e) => {
    //dispatch({ type: 'UPDATE_CANDIDATE_INFO', email:email, name:name });
    console.log(e)
    candidatesServices.createCandidate({email: email, name: name}).then(response => {
      const data = response;
      data['type'] = 'UPDATE_CANDIDATE_INFO';
      data['id'] = data['id'].toString()
      dispatch(data);
      addApplication(data['id']);

    })
    handleClose();
  };
  let color = 'blue';

  if (globalState.state.applications.includes(props.jobID)) {
    color = 'red'
  }
  return (
    <div>
      <AddCircleIcon style={{fontSize: 40, color: color}} onClick={handleClickOpen}/>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Great to hear this Job interests you!
            We'll need your email and name so we know who to contact.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            onChange={handleEmailChange}
            label="Email Address"
            type="email"
            fullWidth
            required
          />
          <TextField
            margin="dense"
            id="name"
            onChange={handleNameChange}
            label="Name"
            type="text"
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={(e) => {
            saveCandidate(e)
          }} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


const Posting = (props) => {
  const classes = useStyles();
  const globalState = useContext(Store);
  let appliedStr = '';
  if (globalState.state.applications.includes(props.job.id)) {
    appliedStr = "***You've applied to this Job***"
  }
  return (
    <ListItem alignItems="flex-start">
      <ListItemIcon>
        <ApplyButton jobID={props.job.id}/>
      </ListItemIcon>
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

export const JobPostings = () => {
  const [page, setPage] = useState(1);
  const [postings, setPostings] = useState({count: 0});
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    candidatesServices.getPostings(page).then(response => {
      setPostings(response);
      setIsLoading(false);
    })
  }, [page]);

  if (isLoading) {
    return <div>Loading...</div>
  }
  const listItems = postings.results.map((job) =>
    <div key={'div' + job.id}>
      <Posting key={'post' + job.id} job={job}/>
      <Divider key={'divider' + job.id} component="li"/>
    </div>
  );

  return (
    <List className={classes.root}>
      {listItems}
    </List>
  );
}