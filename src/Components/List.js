import React,{Component,Fragment} from 'react';
import { getAds } from '../Api/Api';
import { Link } from "react-router-dom";
import Header from './Header';
//import Form from './Form';

class List extends Component {
    constructor(props){
        super(props);
        this.state = { 
            Adlist:[],
            id:''
         };
        this.getList();
    }

    getList=async()=>{
    const list=await getAds();
    this.setState({
        Adlist:list,
        
    });
    }
 //   console.log('hola'+list[0]);
 
  buttonClick=(e)=>{
    e.preventDefault();


    }
   
     render() { 
        let style1={
         height:'20vw'
        }
        let style2={
         height:'25vw'
        }
        let style3={
         height:'15vw'
        }

        return (
      <Fragment> 
       <Header />
       {/* <Form /> */}
            {/* <div>

            <input type="text" placeholder="nombre anuncio"/>
            </div>    */}

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
            <div className="row ">
               
                    {this.state.Adlist.map(Ad =>
                      <div key={Ad._id} className="col-md-3 col-sm-6">
                         <div className="card" style={style1}>
                          <div className="card-image" style={style2}>
                              <img style={style3} src={`http://localhost:3001/${Ad.photo}`} alt='Imagen de anuncio' >
                              </img>
                           </div>    
                    
                         </div> 
                         {/* <button onClick={this.buttonClick}>Detalle</button>                         */}
                         <Link className="uk-button uk-button-danger"  to={{
                           pathname: `/detail/${Ad._id}`,
                           state:{
                              adId:Ad._id
                         }
                        }}>        <h4>{Ad.name}</h4> </Link>
                      </div>
                        )}

           </div>
                            
        </Fragment>      
         );
    }
}



export default List;
