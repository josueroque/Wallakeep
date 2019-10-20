import React, { Component,Fragment } from 'react';
// import{CategoriasConsumer} from '../context/CategoriasContext';
// import{EventosConsumer} from '../context/EventosContext';

class Formulario extends Component {
    state = {  
        nombre:'',
        categoria:''
    }

    //si el usuario agrega un evento o categoria

    obtenerDatosEvento=e=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render() { 
        return (
           <Fragment>
           
                           
              
           
           <form
              onSubmit={e=> {
                e.preventDefault();
             // value.obtenerEventos(this.state)
            }}          
           >
                <fieldset className="uk-fieldset uk-margin" >
                    <legend className="uk-legend uk-text-center">
                        Lista de Anuncios
                    </legend> 

                </fieldset>
                <div className="uk-column-1-4@m uk-margin">
                    <div className="uk-margin" uk-margin="true" >
                        <input 
                            name="nombre"
                            className="uk-input"
                            type="text"
                            placeholder="Nombre de Anuncio"
                            onChange={this.obtenerDatosEvento}
                        />
                    </div>



                    <div className="uk-margin" uk-margin="true" >
                        <select
                        className="uk-select"
                        name="categoria"
                        onChange={this.obtenerDatosEvento}
                        >
                            <option value="">--Selecciona un tag--</option>
  

                        </select>
                    </div>
                        
                   
                    <div className="uk-margin" uk-margin="true" >
                        <input 
                            name="precio"
                            className="uk-input"
                            type="number"
                            placeholder="Precio de Anuncio"
                            onChange={this.obtenerDatosEvento}
                        />
                    </div>

                    <div>
                        <input type="submit" className="uk-button uk-button-danger"
                        value="Busca por precio"/>
                    </div>
                    
                </div>
                    
            </form>
            
     
        </Fragment>
          );
    }
}
 
export default Formulario;

