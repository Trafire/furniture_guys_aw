import React from 'react';
import { Route} from "react-router-dom";
import {Home} from "./Home";
import Box from "@material-ui/core/Box";
import {JobPostings} from "./Candidates";
import {EmployersPortal} from "./Employers";
import {Stats} from "./Stats";
import {Register} from "./register";


export const Main = () => {

  return (
    <Box>
      <Route exact path="/" component={Home}/>
      <Route path="/candidates" component={JobPostings}/>
      <Route path="/employers" component={EmployersPortal}/>
      <Route path="/statistics" component={Stats}/>
      <Route path="/register" component={Register}/>

    </Box>


  );
};


