import React from 'react';
import {HashRouter as Router, Route, Link, Switch} from "react-router-dom";

const Home = () => {
  return <div>Welcome Home</div>
}

const Candidate = () => {
  return <div>Candidate</div>
}

export const Main = () => {
  return (
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/candidates" component={Candidate}/>
    </div>


  );
};


