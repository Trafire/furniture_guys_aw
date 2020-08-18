import React, {useEffect, useState, useContext} from 'react';
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import {Store} from "./Store";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import {employersServices} from "../services/employers.api";
import Button from "@material-ui/core/Button";

export const WritePosting = (props) => {

  const [jobType, setJobType] = useState('QA');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const loading = props.loading;
  const setLoading = props.setLoading;
  const globalState = useContext(Store);
  const employer = globalState.state.username;
  const publishJob = () => {
    if (title && description) {
      const data = {
        employer: employer,
        title: title,
        description: description,
        job_types: jobType
      };
      setDescription('');
      setTitle('')
      setLoading(true);
      employersServices.publishPosting(data);

    }

  };
  return (
    <Box>
      <h1> Create New Posting</h1>
      <TextField
        label={'Job Title'}
        onChange={event => setTitle(event.target.value)}
        value={title}
      />
      <JobTypeRadio jobType={jobType} setJobType={setJobType}/>
      <TextField
        label={'Job Description'}
        variant="outlined"
        fullWidth
        multiline
        rowsMax={5}
        value={description}
        onChange={event => setDescription(event.target.value)}
      />
      <Button onClick={publishJob}>Publish</Button>
    </Box>
  );
};

const JobTypeRadio = (props) => {
  const globalState = useContext(Store);
  const jobTypes = globalState.state.jobTypes;
  const jobType = props.jobType;

  const control = jobTypes.map((jobtype) =>
    <FormControlLabel key={jobtype}
                      value={jobtype}
                      control={<Radio/>}
                      label={jobtype}
    />
  );
  return (
    <RadioGroup aria-label="jobType" name="Job Type" value={jobType} onChange={event => props.setJobType(event.target.value)}>
      {control}
    </RadioGroup>
  );
};
