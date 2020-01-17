import React,{Component,Fragment} from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
class Navbar extends Component {


    render() { 
        return (
            <Fragment>
            <nav className="uk-navbar-container uk-margin" uk-navbar>
                <div className="uk-navbar-left">

                    <Link to={ {pathname: `/list`}} > <div className="uk-navbar-item uk-logo" >
                    <span className="uk-icon uk-margin-small-right" uk-icon="icon: home; ratio:2"> </span>Wallakeep</div>
                    </Link>

                    <ul className="uk-navbar-nav">
                        <li>
                        <Link to={ {pathname: `/Create-Edit`,
                                        state:{  
                                        adId:undefined,
                                        createParent:true
                                                                    
                                        }}} >
                                            <div className="uk-navbar-item uk-logo">

                                <span className="uk-icon uk-margin-small-right" uk-icon="icon: file; ratio:2"></span>
                                Nuevo
                            </div>
                        </Link>    
                        </li>
                        <li> 
                        <Link to={ {pathname: `/`}} >  <div className="uk-navbar-item uk-logo">
                                <span className="uk-icon uk-margin-small-right" uk-icon="icon: lock; ratio:2"></span>
                                Salir
                            </div>
                        </Link>    
                        </li>

                    </ul>

                </div>
            </nav>

                    <div className="text-center" >
                        <label >Usuario: {localStorage.getItem('name')+' '+ localStorage.getItem('surname')}</label>
                    </div> 
            </Fragment>


          );
    }
}
 
export default withRouter(Navbar);




