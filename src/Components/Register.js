import React,{Component,Fragment} from 'react';
import {getTags} from '../Api/Api';
import {UserConsumer} from '../context/UserContext';

class   Register extends Component {

       state={
            name:'',
            surname:'',
            tag:'',
            tags:[]
        }

        componentDidMount(){
            this.getAllTags();
        }
        
       
    
    getAllTags=async()=>{
        const allTags=await getTags();
    //    console.log('obtengo'+allTags);
        this.setState({
            tags:allTags
        });
    }
   
    setUser1=(e)=>{

        this.setState({
            [e.target.name]:e.target.value
        })

        localStorage.setItem('name',this.state.name);
        localStorage.setItem('surname',this.state.surname);
        localStorage.setItem('tag',this.state.tag);


        
    }
    render() { 
    //    console.log('desde reg '+ this.state.tags);
        return (  
           
              
            <Fragment>
               <br/> 
               <h2 className="text-center"> Register Form</h2>
                <div className="container">
                    <br/> 
                    <UserConsumer>
                        {(value)=>{
                        // console.log(value);
                         return(
                    <form 
                    onSubmit={e=> {
                        e.preventDefault();
                      //  console.log(e.target.value);
                     //   console.log(e);
                     value.setUser(this.state);
                     this.props.history.push("/list");
                    // console.log('desde context' + value.name);
                    }}         
                    >
                        <div className="form-group">
                            <label for="name">Name:</label>
                            <input
                                type="text"
                                 className="form-control col-xs-2" 
                                 id="name" 
                                 placeholder="Enter name" 
                                 name="name"
                                 onChange={this.setUser1}
                                 required
                                 />
                        </div>
                        <div className="form-group">
                            <label for="surname">Surname:</label>
                            <input 
                                type="text" 
                                className="form-control col-xs-2" 
                                name="surname"
                                id="surname"
                                onChange={this.setUser1}
                                required
                            />
                        </div>
                        <label for="tags">Tag:</label>
                        <select 
                            className="form-control col-xs-2"
                            onChange={this.setUser1}
                            name="tag"
                            class="custom-select browser-default" required
                        >
                            <option value="" >--Select a tag--</option>
                            {
                                this.state.tags.map(tag=>
                                  
                                        <option key={tag}  value={tag} >{tag}</option>
                                 
                                )
                            }
               

                        </select>
                      
                        <br/>  <br/> <br/>
                        <input type="submit"  className="uk-button uk-button-danger" value="Submit" ></input>
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