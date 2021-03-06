import React, {Component, useState} from "react";
import {render} from "react-dom";
import {Header} from "./Header";
import {Footer} from "./Footer";
import {Main} from "./Main";
import {HashRouter as Router} from "react-router-dom";
import {ThemeProvider} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'
import { StateProvider } from './Store.js';

export const SelectedStoreContext = React.createContext

class App extends Component {
  render() {
    return (
      <div>

        <Router>
          <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Header/>
            <Main/>
            <Footer/>
          </ThemeProvider>
        </Router>

      </div>
    );
  }
}
const app = (
  <StateProvider>
    <App />
  </StateProvider>
);

export default App;

const container = document.getElementById("app");
render( app, container);