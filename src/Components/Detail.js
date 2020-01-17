import React,{Component,Fragment} from 'react';
import { getAd } from '../Api/Api';
import { Link } from "react-router-dom";
import Navbar from './Navbar';

class Detail extends Component {
    constructor(props){
        super(props);
        console.log(props);
    if (this.props.location.state){
        const { adId,pathname } = this.props.location.state

         this.state = { 
           _id:adId,
           Ad:[]
         };
         this.getAdvert(adId);
         localStorage.setItem('_id',adId);
        }
        else{
        const id= localStorage.getItem('_id');
            this.state = { 
                _id:id,
                Ad:[]
              }; 
          this.getAdvert(id);
        }

   this.state = { 
                _id:'',
                Ad:[]
              }; 

    }

    editAdvert=(e)=>{
        e.preventDefault();
    }

    getAdvert=async(id)=>{
        const Advert=await getAd(id);
        this.setState({
            Ad:Advert,
            
        });

    }

    render() { 
        let ruta='';
        if (this.state.Ad.photo){
             if (this.state.Ad.photo.includes('http')){
               ruta=this.state.Ad.photo;
          }
         else{
        ruta=`http://localhost:3001/`+this.state.Ad.photo
            }
    }
 
        return (  
            <Fragment>
                <Navbar />
         
                             <div className="detail-section">     
                                    <div className="card-image">
                                      { 
                                        
                                        this.state.Ad.photo ?
                                        this.state.Ad.photo.includes('http')?   
                                           <img className="img-detail" src={this.state.Ad.photo} alt='Imagen de anuncio' ></img> 
                                           :
                                           <img className="img-detail" src={'http://localhost:3001/'+this.state.Ad.photo} alt='Imagen de anuncio' ></img>
                                           :
                                           ''                                       
                                      }  
                                    </div>
                                    <div className="content"> 
                                        <h3 className="text-center">{this.state.Ad.name}</h3>
                                        <p>{this.state.Ad.description}</p>
                                        <p>{'Precio: $ '+this.state.Ad.price}</p>
                                        <p>{'Tipo: '+this.state.Ad.type}</p>
                                     
                                        
                                        <Link   to={{
                                            pathname: `/Create-Edit/${this.state.Ad._id}` , 
                                            state:{  
                                                adId:this.state.Ad._id,
                                                                            
                                            }
                         
                                        }}>  
                                           <input  type="submit" className="uk-button uk-button-danger"
                                            value="Editar"/>        
                                        </Link>
         
                                     
                                    </div>
                              </div>      
               
                  
             </Fragment>
        );
    }
}
 
export default Detail;