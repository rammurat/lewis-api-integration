// Load necessary libraries
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { Route, Redirect } from 'react-router';

// Load containers
import PSP from './containers/psp/psp.js';

// Load components
import Header from './components/header.js';
import Error from './components/error.js';

// Load store
import store from './store.js';

class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <div className="App">
            {/** Load header */}
            <Header />

            {/** Load dynamic components */}
            <Switch>
              <Route path='/' exact component={PSP}></Route>
              <Route path='/results/:search' component={PSP}></Route>
              <Route path='/error' component={Error} ></Route>
              <Redirect from='/*' to='/error' />
            </Switch>

          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
