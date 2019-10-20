import React,{Component,Fragment} from 'react';
import { getAd } from '../Api/Api';
import Header from './Header';
//import { Link } from "react-router-dom";
class Detail extends Component {
    constructor(props){
        super(props);
        const { adId,pathname } = this.props.location.state
        console.log(pathname);
        console.log('hola '+adId);
        this.state = { 
           _id:adId,
           Ad:[]
         };

    
    this.getAdvert(adId);
    }
    
    getAdvert=async(id)=>{
        const Advert=await getAd(id);
        this.setState({
            Ad:Advert,
            
        });
        console.log('Ad'+Advert['name']);
    }

    render() { 
        return (  
            <Fragment>
                <Header />
                <div className="card" >
                    <div className="card-image" >
                        <img  src={`http://localhost:3001/${this.state.Ad.photo}`} alt='Imagen de anuncio' >
                        </img>
                    </div>    
                    <h3>{this.state.Ad.name}</h3>
                </div> 
             </Fragment>
        );
    }
}
 
export default Detail;