import React,{Fragment, useState, useEffect} from 'react';
import Form from './Form';
import Input from './Input'; 
import {useDispatch,useSelector} from 'react-redux';
import {saveUserAction} from '../actions/userActions';
import {getTagsAction,} from '../actions/tagsActions';

const Register=(props)=>  {

        useEffect(()=>{
            //getAllTags();
            const loadTags = () => dispatch( getTagsAction() ) ;
            loadTags();
        },[]);
        
       const [tag,setTag]=useState('') ;
       const tags = useSelector( state => state.tags.tags );
       const dispatch=useDispatch();
     
        const setTagValue=(e)=>{

            setTag(e.target.value);
        }

        const actionSubmit = values => {
            const user={name:values.name,surname:values.surname,tag:tag};
            console.log(props);
            if (user.name.length<3||user.surname.length<3 ){
                alert('Datos no validos');

            }else{

                const saveUser = () => dispatch(saveUserAction(user) ) ;
                saveUser();
                props.history.push("/list");
            }    

      };   


        return (  
           
              
            <Fragment>
               <br/> 
               <h2 className="text-center"> Formulario de Registro</h2>
                <div className="container">
                    <br/> 
                   <Form
                         initialValues={{ name: '', surname: '', tag: '' }}   
                         onSubmit={actionSubmit}   
                    >
                        <div className="form-group">
                            <label for="name">Nombre:</label>
                            <Input
                                type="text"
                                 className="form-control col-xs-2" 
                                 id="name" 
                                 placeholder="Ingrese el nombre" 
                                 name="name"
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
                          onChange={setTagValue}
                            name="tag"
                            id="tag"
                            class="custom-select browser-default" required
                        >
                            <option value="" >--Selecione un tag--</option>
                            {
                                tags.map(tag=>
                                  
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
 
export default Register;