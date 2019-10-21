import React,{Component,Fragment} from 'react';
import {getTags} from '../Api/Api';
import {UserConsumer} from '../context/UserContext';
import { valueToNode } from '@babel/types';
class   Register extends Component {
    constructor(props){
        super(props);
        this.state={
 
            tags:[]
        }
        this.getAllTags();
       
    }
    getAllTags=async()=>{
        const allTags=await getTags();
        console.log('obtengo'+allTags);
        this.setState({
            tags:allTags
        });
    }
    setUser=(e)=>{
      //  e.preventDefault();
      
        
    }
    render() { 
        console.log('desde reg '+ this.state.tags);
        return (  
           
              
            <Fragment>
               <br/> 
               <h2 className="text-center"> Register Form</h2>
                <div className="container">
                    <br/> 
                    <UserConsumer>
                        {(value)=>{
                         console.log(value);
                         return(
                    <form 

                    >
                        <div className="form-group">
                            <label for="name">Name:</label>
                            <input type="text" className="form-control" id="name" placeholder="Enter name" name="name" />
                        </div>
                        <div className="form-group">
                            <label for="surname">Surname:</label>
                            <input type="text" className="form-control" id="surname"/>
                        </div>
                        <label for="tags">Tag:</label>
                        <select className="form-control">
                            <option >--Select a tag--</option>
                            {
                                this.state.tags.map(tag=>
                                  
                                        <option key={tag} >{tag}</option>
                                 
                                )
                            }
               

                        </select>
                      
                        <br/>
                        <button onChange={this.setUser} type="submit" className="uk-button uk-button-danger">Submit</button>
                    </form>
                    )
                }}
                </UserConsumer>
                </div>
            
                </Fragment>
      
                                        
        );
    }
}
 
export default Register;