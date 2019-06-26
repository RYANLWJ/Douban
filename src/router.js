import React from 'react';
import { Router, Route, Switch } from 'dva/router';
// import IndexPage from './routes/IndexPage';

// import Header from './components/Header'
import Home from './pages/Home'
import SignIn from './pages/SignIn'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/sign"  component={SignIn} />
      </Switch>
    
    </Router>
  );
}

export default RouterConfig;
