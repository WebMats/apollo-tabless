import React, { Component } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';
import { checkAuth } from './shared/manageAuthStatus';
import TabsPage from './pages/tabs';
import AddTabPage from './pages/add-tab';
import Logout from './pages/logut';
import './App.scss';

class App extends Component {
  render() {
    return (
      <ApolloConsumer>
        {client => {
          checkAuth(client)
          return ( 
            <div className="App">
              <Switch>
                <Route path="/my-tabs" component={TabsPage} />
                <Route path="/add-tab" component={AddTabPage} />
                <Route path="/logout" component={Logout} />
                <Redirect to="/my-tabs" />
              </Switch>
            </div>
          )
        }}
        </ApolloConsumer>
    );
  }
}

export default App;
