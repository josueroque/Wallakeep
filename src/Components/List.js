import React,{Fragment,useEffect,useState} from 'react';
//import { getAds,getAdName,getTags, filterByTag, filterByPrice } from '../Api/Api';
import { Link } from "react-router-dom";
import UserConsumer from '../context/UserContext';
import Navbar from './Navbar';
import {getAdsAction,filterPriceAction,filterNameAction,filterTagAction} from '../actions/adsActions';
import {getTagsAction,} from '../actions/tagsActions';
import {useDispatch,useSelector,ReactReduxContext} from 'react-redux';
//import getUserAction from './actions';
//import Form from './Form';

const List =()=>  {

    const[price1,onP1Change]=useState('');
    const[price2,onP2Change]=useState('');
    const[tag,onTagChange]=useState(localStorage.getItem('tag'));

    const dispatch=useDispatch();

    useEffect( () => {

        const loadAds = () => dispatch(filterTagAction(tag) ) ;
        loadAds();
        const loadTags = () => dispatch( getTagsAction() ) ;
        loadTags();
    }, []);

    const loading = useSelector(state => state.ads.loading);
    const error = useSelector( state => state.ads.error);
    const ads = useSelector( state => state.ads.ads );
    const tags = useSelector( state => state.tags.tags );
    const filterByPrice=(price1,price2) =>dispatch(filterPriceAction(price1,price2));
    const filterByName=(name) =>dispatch(filterNameAction(name));
    const filterByTag=(tag) =>dispatch(filterTagAction(tag));
    

    return (
        <Fragment>    
            <Navbar />
            <form
              onSubmit={e=> {
                e.preventDefault();
                localStorage.setItem('_id',undefined);
               console.log(price1);
               filterByPrice({price1,price2});

            }}          
           >
                <fieldset className="uk-fieldset uk-margin" >
                    <legend className="uk-legend uk-text-center">
                       Mostrando {ads.length} Anuncios
                    </legend> 

                </fieldset>
                <div className="uk-column-1-5@m uk-margin">
                    <div className="uk-margin" uk-margin="true" >
                        <input 
                            name="name"
                            className="uk-input"
                            type="text"
                            placeholder="Nombre de Anuncio"
                            onChange={e=>filterByName(e.target.value)}
                        />
                    </div>

                    <div className="uk-margin" uk-margin="true" >
                        <select
                        className="uk-select"
                        name="tag"
                        id="tag"
                        onClick={e=>filterByTag(e.target.value)}
                        onChange={e=>onTagChange(e.target.value)}
                        value={tag}
                       defaultValue={ localStorage.getItem('tag')}
                        >
                            <option value="" >--Todos los tags--</option>
                            {
                                tags.map(tag=>
                                  
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
                            onChange={e=>onP1Change(e.target.value)}
                        />
                    </div>

                    <div className="uk-margin" uk-margin="true" >
                        <input 
                            name="precio2"
                            className="uk-input"
                            type="number"
                            placeholder="Precio hasta"
                            onChange={e=>onP2Change(e.target.value)}
                        />
                    </div>

                    <div>
                        <input type="submit" className="uk-button uk-button-danger"
                        value="Filtrar por precio"/>
                    </div>
                    
                </div>
                    
            </form>

            <div className="row">
               
                    {ads.map(Ad =>
                      <div key={Ad._id} className="col-md-3 col-sm-6">
                         <UserConsumer>
                         <div className="card" >

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
                        

export default List;
