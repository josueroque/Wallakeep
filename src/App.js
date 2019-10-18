import React from 'react';
import List from './Components/List';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="text-center">
           <Router>
          <Switch>
              {/* <Route exact path="/register" component={Register} />
              <Route exact path='/profile' component={Profile} /> */}
              <Route exact path='/home' component={List} />
              {/* <Route exact path="/detail/:adId" component={Detail} /> */}
              
          </Switch>
        </Router>
    <List />
    </div>
  );
}

export default App;
