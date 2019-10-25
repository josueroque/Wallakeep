import React,{Component,Fragment} from 'react';
import { getAd } from '../Api/Api';
import Header from './Header';
import UserConsumer from '../context/UserContext';
import { Link } from "react-router-dom";
import Navbar from './Navbar';
//import { Link } from "react-router-dom";
class Detail extends Component {
    constructor(props){
        super(props);
    if (this.props.location.state){
        const { adId,pathname } = this.props.location.state
 
     //   console.log('hola '+this.props.match.params);
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
    
    

   // console.log(this.props.location);
   this.state = { 
                _id:'',
                Ad:[]
              }; 

     //this.getDerivedStateFromProps();    
     console.log(this.state)     
    }
    // componentDidMount () {
    //   if (this.props.match.params){
    //     const { handle } = this.props.match.params;
    //     console.log('handle');
    //     console.log(handle);
    //     this.setState({
    //         _id:handle,
    //         Ad:[]
    //     })
    //   }
    //   this.getAdvert(this.state._id);

    // }
    
    // static getDerivedStateFromProps(props,state){
    //     return{

    //         name:props.name
    //     }
    // }

    editAdvert=(e)=>{
        e.preventDefault();

    }

    getAdvert=async(id)=>{
        const Advert=await getAd(id);
        this.setState({
            Ad:Advert,
            
        });
        console.log('Ad'+Advert['name']);
    }

    render() { 
        console.log(this.state._id);
        return (  
            <Fragment>
                <Navbar />
               {/* // <Header /> */}

                
         
                             <div className="detail-section">     
                                    <div className="image-container card-image">
                                        <img  src={`http://localhost:3001/${this.state.Ad.photo}`} alt='Imagen de anuncio' >
                                        </img>
                                    </div>
                                    <div className="content"> 
                                        <h3 className="text-center">{this.state.Ad.name}</h3>
                                        <p>{this.state.Ad.description}</p>
                                        <p>{'Precio: $ '+this.state.Ad.price}</p>
                                     
                                        
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