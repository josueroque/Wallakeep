import React,{Component,Fragment} from 'react';
import { getAds,getAdName,getTags, filterByTag } from '../Api/Api';
import { Link } from "react-router-dom";
import Header from './Header';
import UserConsumer from '../context/UserContext';
import Navbar from './Navbar';
//import Form from './Form';

class List extends Component {
    constructor(props){
        super(props);
        this.state = { 
            Adlist:[],
            id:'',
            Adname:'',
            tag:'',
            tags:[]

         };
        this.getList();
        this.getAllTags();
       
        //console.log( this.props.location);
    }
    getAllTags=async()=>{
        const allTags=await getTags();
    //    console.log('obtengo'+allTags);
        this.setState({
            tags:allTags
        });
    }

    filterTag=async(e)=>{
        // this.setState({
        //     Adname:e.target.value
        // })
        let list=[];
        console.log(e.target);
        if (e.target.value!==''){
            list=await filterByTag (e.target.value);
            this.setState({
                Adlist:list,
                
            });
            console.log('desde if' + list);
        }
        else{
          this.getList ();
          console.log('desde else' + this.state.Adlist);
        }
  

          console.log('hola');  
          console.log(list);
       // console.log(this.state.Adname);
    }


    onNameChange=async(e)=>{
        // this.setState({
        //     Adname:e.target.value
        // })
        let list=[];
        if (e.target.value!==''){
            list=await getAdName (e.target.value);
            this.setState({
                Adlist:list,
                
            });
            console.log('desde if' + list);
        }
        else{
          this.getList ();
          console.log('desde else' + this.state.Adlist);
        }
  

          console.log('hola');  
          console.log(list);
       // console.log(this.state.Adname);
    }

    getList=async()=>{
    const list=await getAds();
    this.setState({
        Adlist:list,
        
    });
   
    }
 //   console.log('hola'+list[0]);
 
    seeDetail=(e)=>{
        //e.preventDefault();
      //  this.props.history.push("/"+);

    }

    componentDidUpdate(){
      //  console.log(this.state);
    }
   
     render() { 
        let style1={
         height:'20vw'
        }
        let style2={
         height:'20vw'
        }


        return (
      <Fragment> 
      
       {/* <Form /> */}
            {/* <div>

            <input type="text" placeholder="nombre anuncio"/>
            </div>    */}
                   <Navbar />
              <form
              onSubmit={e=> {
                e.preventDefault();
                localStorage.setItem('_id',undefined);
                this.props.history.push("/Create-Edit");
                
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
                            name="name"
                            className="uk-input"
                            type="text"
                            placeholder="Nombre de Anuncio"
                            onChange={this.onNameChange}
                        />
                    </div>



                    <div className="uk-margin" uk-margin="true" >
                        <select
                        className="uk-select"
                        name="tag"
                        onChange={this.filterTag}
                        >
                            <option value="" >--Select a tag--</option>
                            {
                                this.state.tags.map(tag=>
                                  
                                        <option key={tag}  value={tag} >{tag}</option>
                                 
                                )
                            }
  

                        </select>
                    </div>
                        
                   <div className="uk-margin" uk-margin="true" >
                        <input 
                            name="precio"
                            className="uk-input"
                            type="number"
                            placeholder="Precio de Anuncio"
                            onChange={this.filterTag}
                        />
                    </div>

                    <div>
                        <input type="submit" className="uk-button uk-button-danger"
                        value="Create new ad"/>
                    </div>
                    
                </div>
                    
            </form>
            <div className="row ">
               
                    {this.state.Adlist.map(Ad =>
                      <div key={Ad._id} className="col-md-3 col-sm-6">
                         <UserConsumer>
                         <div className="card" style={style1}>
                         
                              {/* <input onClick={this.seeDetail} type="image" style={style3} src={`http://localhost:3001/${Ad.photo}`} alt='Imagen de anuncio' >
                                  
                              </input> */}
                             <Link   to={{
                           pathname: `/detail/${Ad._id}` , 
                           state:{  
                              adId:Ad._id,
                                                           
                           }
                         
                        }}>  
                         <div className="card-image" >
                            <img src={`http://localhost:3001/${Ad.photo}`} alt='Imagen de anuncio' style={style2} ></img>  
                        </div>   
                        
                        </Link>
                           
                         
                         </div> 
                 
                         <p className="uk-legend uk-text-center">{Ad.name +' $'+Ad.price+ ' '+ Ad.tags} </p> 
                         {/* <input type="submit" className="uk-button uk-button-danger"
                                        value="Editar"/>   */}
                    </UserConsumer>
                      </div>
                        )}

           </div>
                            
        </Fragment>      
         );
    }
}



export default List;
