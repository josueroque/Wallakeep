import React from 'react';
import List from './Components/List';
import Detail from './Components/Detail';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="text-center">
           <Router>
              <Switch>
              <Route exact path="/detail/:id" component={Detail} />
              <Route exact path='/' component={List} />
            </Switch>
          </Router>
  
    </div>
  );
}

export default App;
