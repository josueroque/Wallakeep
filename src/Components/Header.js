import React,{Component,Fragment} from 'react';

class Header  extends Component {
    state = {  }


    render() { 
       
        return ( 
            <Fragment>
            <header  className="uk-margin" uk-margin="true">
            <h1  className=" ">Wallakeep </h1>
 
            </header>
  
            {/* <div  className="col-md-3 col-sm-6">
                Tag: {localStorage.getItem('tag')}
            </div>  */}
            </Fragment>
         );
    }

  
        
    
}
 


 
export default Header ;