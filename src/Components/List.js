import React,{Component,Fragment} from 'react';
import { getAds } from '../Api/Api';
import { Link } from "react-router-dom";
class List extends Component {
    constructor(props){
        super(props);
        this.state = { 
            Adlist:[]
         };
        this.getList();
    }

    getList=async()=>{
    const list=await getAds();
    this.setState({
        Adlist:list
    });
    }
 //   console.log('hola'+list[0]);
 
  buttonClick=(e)=>{
    e.preventDefault();
    this.props.history.push('/detail/:id');

    }
   
     render() { 
        return (
      <Fragment>   
            <div>

            <input type="text" placeholder="nombre anuncio"/>
            </div>   
            <div className="row">
               
                    {this.state.Adlist.map(Ad =>
                      <div key={Ad._id} className="col-md-3 col-sm-6">
                         <div className="card">
                          
                            <img src={`http://localhost:3001/${Ad.photo}`} alt='Imagen de anuncio' >
                            </img> 
                            <a href="/image">{Ad.name}</a>
                         </div> 
                         {/* <button onClick={this.buttonClick}>Detalle</button>                         */}
                         <Link to={`/detail/${Ad._id}`}>See detail</Link>
                      </div>
                        )}

           </div>
                            
        </Fragment>      
         );
    }
}



export default List;
