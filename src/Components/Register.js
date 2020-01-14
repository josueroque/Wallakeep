import React,{Fragment,useEffect,useState} from 'react';
import {useDispatch,useSelector,ReactReduxContext} from 'react-redux';
//import {getTags} from '../Api/Api';
import {getTagsAction,} from '../actions/tagsActions';
//import {UserConsumer} from '../context/UserContext';

const Register = (props) => {
       

        const[name,updateName]=useState('');
        const[surname,updateSurname]=useState('');
        const[tag,updateTag]=useState('');
        const tags =useSelector( state => state.tags.tags );
        const dispatch=useDispatch();
        useEffect( () => {

            const loadTags = () => dispatch( getTagsAction() ) ;
           loadTags();

        },[] );

       function setUser1(e){
        console.log(e.target.value);
        updateTag(e.target.value) ;
       }


       console.log(tags);
        return (  
           
              
            <Fragment>
               <br/> 
               <h2 className="text-center"> Formulario de Registro</h2>
                <div className="container">
                    <br/> 

                    <form 
                    onSubmit={e=> {
                        e.preventDefault();
                      //  console.log(e.target.value);
                     //   console.log(e);
                     console.log(this.state);
                     localStorage.setItem('name',this.state.name);
                     localStorage.setItem('surname',this.state.surname);
                     localStorage.setItem('tag',this.state.tag);
                    // value.setUser(this.state);
                     this.props.history.push("/list");
                    // console.log('desde context' + value.name);
                    }}         
                    >
                        <div className="form-group">
                            <label for="name">Nombre:</label>
                            <input
                                type="text"
                                 className="form-control col-xs-2" 
                                 id="name" 
                                 placeholder="Ingrese el nombre" 
                                 name="name"
                                onChange={e=>updateName(e.target.value)}
                                 required
                                 />
                        </div>
                        <div className="form-group">
                            <label for="surname">Apellido:</label>
                            <input 
                                type="text" 
                                className="form-control col-xs-2" 
                                name="surname"
                                id="surname"
                                placeholder="Ingrese el apellido" 
                               onChange={e=>updateSurname(e.target.value)}
                                required
                            />
                        </div>
                        <label for="tags">Tag:</label>
                        <select 
                            className="form-control col-xs-2"
                             onChange={setUser1}
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
                    </form>
                    
                
                {/* </UserConsumer> */}
                </div>
            
                </Fragment>
      
                                        
        );
    
}
 
export default Register;