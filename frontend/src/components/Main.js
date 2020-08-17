import React from 'react';
import { Route} from "react-router-dom";
import {Home} from "./Home";
import Box from "@material-ui/core/Box";


const Candidate = () => {
  return <div>Candidate</div>
}

export const Main = () => {
  return (
    <Box>
      <Route exact path="/" component={Home}/>
      <Route path="/candidates" component={Candidate}/>
    </Box>


  );
};


