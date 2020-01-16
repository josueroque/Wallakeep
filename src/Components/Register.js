import React,{Component,Fragment} from 'react';
import {getTags} from '../Api/Api';
//import {UserConsumer} from '../context/UserContext';
import Form from './Form';
import Input from './Input'; 


class   Register extends Component {

       state={

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
   
    // setUser1=(e)=>{

    //     this.setState({
    //         [e.target.name]:e.target.value
    //     })
    // }
    
     handleSubmit = values => {

        // Genero sesión y la guardo en LS si ha seleccionado "remember"
//           userLogin(new Session(name, surname), remember);

      };   

    render() { 
    //    console.log('desde reg '+ this.state.tags);
        return (  
           
              
            <Fragment>
               <br/> 
               <h2 className="text-center"> Formulario de Registro</h2>
                <div className="container">
                    <br/> 
                   <Form
                         initialValues={{ name: '', surname: '', tag: '' }}   
                         onSubmit={this.handleSubmit}   
                    >
                        <div className="form-group">
                            <label for="name">Nombre:</label>
                            <Input
                                type="text"
                                 className="form-control col-xs-2" 
                                 id="name" 
                                 placeholder="Ingrese el nombre" 
                                 name="name"
  //                              onChange={this.setUser1}
                                 required
                                 />
                        </div>
                        <div className="form-group">
                            <label for="surname">Apellido:</label>
                            <Input 
                                type="text" 
                                className="form-control col-xs-2" 
                                name="surname"
                                id="surname"
                                placeholder="Ingrese el apellido" 
//                               onChange={this.setUser1}
                                required
                            />
                        </div>
                        <label for="tags">Tag:</label>
                        <select 
                            className="form-control col-xs-2"
                          onChange={this.setUser1}
                            name="tag"
                            id="tag"
                            class="custom-select browser-default" required
                        >
                            <option value="" >--Selecione un tag--</option>
                            {
                                this.state.tags.map(tag=>
                                  
                                        <option key={tag}  value={tag} >{tag}</option>
                                 
                                )
                            }
               

                        </select>
                      
                        <br/>  <br/> <br/>
                        <input type="submit"  className="uk-button uk-button-danger" value="Enviar" ></input>
                    </Form>
                    
                
          
                </div>
            
                </Fragment>
      
                                        
        );
    }
}
 
export default Register;