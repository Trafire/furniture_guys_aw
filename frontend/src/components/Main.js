import React from 'react';
import { Route} from "react-router-dom";
import {Home} from "./Home";
import Box from "@material-ui/core/Box";
import {JobPostings} from "./Candidates";


export const Main = () => {

  return (
    <Box>
      <Route exact path="/" component={Home}/>
      <Route path="/candidates" component={JobPostings}/>
    </Box>


  );
};


