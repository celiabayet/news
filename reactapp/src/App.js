import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './stylesheets/App.css';
import theme from "./components/Theme";
import { ThemeProvider } from "@mui/material";

import {Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux'

import wishList from './reducers/article'
import token from './reducers/token'
import language from './reducers/language'

import Home from './screens/Home';
import ArticlesBySource from './screens/ArticleBySource'
import Library from './screens/Library'
import Source from './screens/Source'

const store = createStore(combineReducers({wishList, token, language}))

function App() {
  return (
    <ThemeProvider theme={theme}>
      
      <Provider store={store}>
        <Router>
          <Switch>
            <Route component={Home} exact path="/"/>
            <Route component={Source} exact path="/source"/>
            <Route component={ArticlesBySource} path="/articlesbysource/:id" exact />
            <Route component={Library} path="/library" exact />
          </Switch>
        </Router>
      </Provider>
      
    </ThemeProvider>

  );
}

export default App;
