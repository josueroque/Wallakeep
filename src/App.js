import React ,{Component} from 'react';
import List from './Components/List';
import Detail from './Components/Detail';
import CreateEdit from './Components/CreateEdit';
import Register from './Components/Register';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserProvider from './context/UserContext';
import { withRouter } from 'react-router-dom';
import Header from './Components/Header';
import Navbar from './Components/Navbar';
import ErrorBoundary from './Components/ErrorBoundary';
import { Provider } from 'react-redux';
import store from './store';

 
class App  extends Component {

  state = {  }
  render() { 
    return (      
      <div className="text-center">
         <ErrorBoundary>
            <UserProvider>
              <Router>
              <Provider store={store}>
                <Switch>
                  <Route exact path="/detail/:id" component={Detail}  />
                  <Route exact path='/Create-Edit/:id' component={CreateEdit}  />
                  <Route exact path='/Create-Edit' component={CreateEdit}  />
                  <Route exact path='/List' component={List} />
                  <Route exact path='/' component={Register}  />
                </Switch>
                </Provider>
            </Router>
          </UserProvider>
      </ErrorBoundary>
    </div>
    );
  }
}
 
export default App;
