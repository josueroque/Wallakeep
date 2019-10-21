import React from 'react';
import List from './Components/List';
import Detail from './Components/Detail';
import Register from './Components/Register';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserProvider from './context/UserContext';
function App() {
  return (
    <div className="text-center">
           <UserProvider>
            {/* <Router>
                <Switch>
                  <Route exact path="/detail/:id" component={Detail} />
                  <Route exact path='/List' component={List} />
                  <Route exact path='/' component={Register} />
                </Switch>
            </Router> */}
            <Register />
          </UserProvider>
  
    </div>
  );
}

export default App;
