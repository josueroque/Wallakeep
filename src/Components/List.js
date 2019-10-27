import React,{Component,Fragment} from 'react';
import { getAds,getAdName,getTags, filterByTag, filterByPrice } from '../Api/Api';
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
            tag:localStorage.getItem('tag'),
            tags:[],
            price1:'',
            price2:'',
            numAds:0

         };
        this.getList();
        this.getAllTags();
       
        this.onP1Change=this.onP1Change.bind(this);
        this.onP2Change=this.onP2Change.bind(this);
        this.onPriceChange=this.onPriceChange.bind(this);
        this.onfilterChange=this.onfilterChange.bind(this);
        //console.log( this.props.location);
    }

    componentDidMount(){
       // console.log('desde CDM '+localStorage.getItem('surname'));
        this.filterTag(this.state.tag);
    }
    getAllTags=async()=>{
        const allTags=await getTags();
    //    console.log('obtengo'+allTags);
        this.setState({
            tags:allTags
        });
    }

    filterTag=async(tag)=>{
        // this.setState({
        //     Adname:e.target.value
        // })
        let list=[];
// if (e.target) console.log('desde filterTag '+ e.target + e.target.name + e.target.name.value);
//     let defaultTag;
//     if (e.target===undefined){
//        defaultTag=e;
//     }    
//     else{
//         defaultTag=e.target.value;
//     }
console.log('desde filter '+tag) ;
//         if (defaultTag!==''){
        if(this.state.tag===''){
            list=await getAds (); 
        }
        else {
            list=await filterByTag (tag);
        }
            
            this.setState({
                Adlist:list,
                
            });
   
            console.log(list);
        // }
        // else{
        //   this.getList ();
        //   console.log('desde else' + this.state.Adlist);
        // }
  

        //   console.log('hola');  
        //   console.log(list);
       // console.log(this.state.Adname);
    }
    onP1Change(e){
        this.setState({price1:e.target.value})
    }
    onP2Change(e){
        this.setState({price2:e.target.value})
    }
   
    onPriceChange=async(p1,p2)=>{
        let list=[];
            list=await filterByPrice (this.state.price1,this.state.price2);
            this.setState({
                Adlist:list,
                
            });
            //console.log('desde if' + list);
        }

   onfilterChange =async(e)=>{
  
       let {name, value} = e.target;
       console.log(e.target);
      this.setState({tag: value,});

       await this.filterTag(value);
   }

//    onfilterChange= function (event) {
//     this.setState({ title: event.target.value }, () => this.filterTag());
//   },
//   APICallFunction: function () {
//     // Call API with the updated value
//   }

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
           // console.log('desde if' + list);
        }
        else{
          this.getList ();
        //  console.log('desde else' + this.state.Adlist);
        }
  

          //console.log('hola');  
          //console.log(list);
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

    // componentDidUpdate(){
    //   //  console.log(this.state);
    // }
   
     render() { 
        let style1={
         height:'20vw'
        }
        let style2={
         height:'20vw'
        }


        return (
      <Fragment> 
            <Navbar />
              <form
              onSubmit={e=> {
                e.preventDefault();
                localStorage.setItem('_id',undefined);
                this.onPriceChange(this.state.price1,this.state.price2);
               // this.props.history.push("/Create-Edit");
                
             // value.obtenerEventos(this.state)
            }}          
           >
                <fieldset className="uk-fieldset uk-margin" >
                    <legend className="uk-legend uk-text-center">
                       Mostrando {this.state.Adlist.length} Anuncios
                    </legend> 

                </fieldset>
                <div className="uk-column-1-5@m uk-margin">
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
                        id="tag"
                        onClick={this.onfilterChange}
                        value={this.state.tag}
                       defaultValue={ localStorage.getItem('tag')}
                        >
                            <option value="" >--Todos los tags--</option>
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
                            placeholder="Precio desde"
                            onChange={this.onP1Change}
                        />
                    </div>

                    <div className="uk-margin" uk-margin="true" >
                        <input 
                            name="precio2"
                            className="uk-input"
                            type="number"
                            placeholder="Precio hasta"
                            onChange={this.onP2Change}
                        />
                    </div>

                    <div>
                        <input type="submit" className="uk-button uk-button-danger"
                        value="Filtrar por precio"/>
                    </div>
                    
                </div>
                    
            </form>
            <div className="row">
               
                    {this.state.Adlist.map(Ad =>
                      <div key={Ad._id} className="col-md-3 col-sm-6">
                         <UserConsumer>
                         <div className="card" >
                         {/* <div className="card" style={style1}> */}
                         
                              {/* <input onClick={this.seeDetail} type="image" style={style3} src={`http://localhost:3001/${Ad.photo}`} alt='Imagen de anuncio' >
                                  
                              </input> */}
                             <Link   to={{
                           pathname: `/detail/${Ad._id}` , 
                           state:{  
                              adId:Ad._id,
                                                           
                           }
                         
                        }}>  
                         <div className="card-image" >
                            {/* <img src={`http://localhost:3001/${Ad.photo}`} alt='Imagen de anuncio' style={style2} ></img>   */}
                            {
                                Ad.photo.includes('http') ?
                                <img  src={Ad.photo} alt='Imagen de anuncio' ></img>  
                                :
                                <img  src={`http://localhost:3001/${Ad.photo}`} alt='Imagen de anuncio' ></img>  
                             
                            }
                            <div className="card-image">
                              <p > Articulo:{Ad.name} </p> 
                              <p className="uk-icon uk-margin-small-right" uk-icon="icon: credit-card; ratio:1">Precio:{Ad.price} </p> 
                              <p className="">Tags:{ Ad.tags.join(', ')} </p> 
                            </div>  
                        </div>   
                      
                        </Link>
                           
                         
                         </div> 
                 
                         
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
