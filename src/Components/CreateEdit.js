import React,{Fragment,useEffect,useState} from 'react';
import Navbar from './Navbar';
import {getAdsAction,getAdAction,saveAdAction,updateAdAction} from '../actions/adsActions';
import {getTagsAction,} from '../actions/tagsActions';
import {useDispatch,useSelector,ReactReduxContext} from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';
import { isUserWhitespacable } from '@babel/types';
const CreateEdit = (props) => {
    let createParent;

        if (props.location.state){
         if (props.location.state.createParent===true){
             createParent=true;
             

         }
         else{
            localStorage.setItem('_id',props.match.params.id);
             createParent=false;
         }

        } else{
            if (localStorage.getItem('new')) {
                createParent=localStorage.getItem('new');
            }
        }
              
        localStorage.setItem('new',createParent);

        const dispatch=useDispatch();

        useEffect( () => {
            const loadAds = () => dispatch(getAdsAction()) ;
            loadAds();
            const loadTags = () => dispatch( getTagsAction() ) ;
            loadTags();

            if (tags.length!==0){
                localStorage.setItem('tags',tags);  
            }

        }, []);

            const ads=useSelector(state=>state.ads.ads);

           let id;
           if (props.location.state ){
               id=props.location.state.adId;
           }
           else if(props.match.params.id ){
               id=props.match.params.id;
           }
        
           const ad=ads.find(a=>a._id===id);
           const  _id=useState(createParent===true ? '':id);
           const [  Ad,updateAd]=useState(createParent===true || (ad===undefined)  ? []:ad);
  
            useEffect(()=>{
                
              if (Ad.length===0 && createParent!==true){

                    if (ad){
                  
                        updateAd(ad);

                 
                    }  
                }

             },)

         //   const [tags,updateTags] =useState (useSelector( state => state.tags.tags ));

            const tags =useSelector( state => state.tags.tags );
            const [  selectedTags,onTagsChange]=useState(createParent===true ?[]:(Ad.tags===undefined) ?[]:Ad.tags) ;
            const [  name,onNameChange]=useState(createParent===true  ?'':Ad.name);
            const [  description,onDescriptionChange]=useState(createParent===true ?'':Ad.description);
            const [  price,onPriceChange]=useState(createParent===true  ?'':Ad.price);
            const [  type,onTypeChange]=useState(createParent===true ?'sell':Ad.type);
            const [  photo,onPhotoChange]=useState(createParent===true ?[]:Ad.photo);
            const [loading,updateLoading]=useState(false); 
            const  [ afterSave,updateAfterSave]=useState(false);
           const [  afterSaveMessage,updateAfterSaveMessage]=useState('Datos Guardados!!') ;
           const saveAd=(ad) =>dispatch(saveAdAction(ad));
           const editAd=(ad) =>dispatch(updateAdAction(ad));

          useEffect(()=>{
            const loadTags = () => dispatch( getTagsAction() ) ;
            loadTags();
            
                 if (Ad.tags){

         if(createParent!==true){
                    if (tags.length===0){

                        // let arrayTag=new Array;
                        // arrayTag=localStorage.getItem('tags').split(',');

                       // updateTags(arrayTag);
                    }
                    onTagsChange({
                        selectedTags:Ad.tags
                    })
                 };
                 onNameChange(Ad.name);
                 onPhotoChange(Ad.photo);
                 onPriceChange(Ad.price);
                 onTypeChange(Ad.type);

                 onDescriptionChange(Ad.description); 
         }     
    
              
           },[Ad])

           useEffect(()=>{
            if (props.match.params.id ===undefined && createParent===true){
                
                 onNameChange('');
                 onPhotoChange('');
                 onPriceChange('');
                 onTypeChange('');
                 onDescriptionChange(''); 

          
              }
           },[createParent])
       
          
            let arreglo=new Array;
            const tagsChanged=(e)=>{

                let tagsArray;
                if (selectedTags.selectedTags){
                    tagsArray  =selectedTags.selectedTags;    
                }
                else{
                    tagsArray=selectedTags;
                 }

                if(tagsArray.includes(e.target.value)){
                
                    let element=tagsArray.indexOf(e.target.value);
                    tagsArray.splice(element,1);

                }
                else{
                    tagsArray.push(e.target.value);
                
                }


                onTagsChange({
                    selectedTags:tagsArray
                })

                 return selectedTags;
            }


    if (props.location.state){
    
        const { adId,pathname } = props.location.state;
    }
    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

let selected=new Array;
if(selectedTags.selectedTags===undefined){
        selected=selectedTags;
    }else
    {
        selected=  selectedTags.selectedTags;  
    }
//Guardar
const wait=async(ms)=> {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

const saveChanges=async()=>{


    try { 
        updateLoading(true);   
      //  console.log(_id);
    let editedAd={
        name:name,
        description:description,
        type:type.toLowerCase(),
        price:price,
        tags:selected,
        id:_id[0]
    }

      editAd(editedAd)

    await wait(1000);
    updateLoading(false);
    updateAfterSave(true);
    await wait(1000);
    updateLoading(false);
    updateAfterSave(false);
  //  console.log(response);
    }

catch (error) {
    console.log(error);
    await wait(1000); 
    updateLoading(false);
    updateAfterSave(true);
    updateAfterSaveMessage('Ha sucedido un error!!');
    await wait(1000);
    updateLoading(false);
    updateAfterSave(false);
    updateAfterSaveMessage('Datos guardados!!'); 
 }
}

const saveNew=async()=>{

 try {
    updateLoading(true);
  console.log(type);
  let newType;
  if (type===''){
      newType='sell';
  }
    let createdAd={
        name:name,
        description:description,
        type:newType.toLowerCase(),
        price:price,
        tags:selected,
        photo:photo
    }

    const response= saveAd(createdAd);
    //console.log(response);
    await wait(1000);
    updateLoading(false);
    updateAfterSave(true);
    await wait(1000);
    updateLoading(false);
    updateAfterSave(false);
    await wait(1000);
    props.history.push("/list");
 } catch (error) {
    await wait(1000); 
    updateLoading(false);
    updateAfterSave(true);
    updateAfterSaveMessage('Ha sucedido un error!!');
    console.log(error);
    await wait(1000);
    updateLoading(false);
    updateAfterSave(false);
    updateAfterSaveMessage('Datos guardados!!'); 
 }

}

        return (  
            <Fragment>
            <Navbar></Navbar> 
        
                             <div className="detail-section">     
                                    <div className="image-container card-image">
                                        <h3>Previsualizacion de imagen</h3>
                                        {  createParent===true?  
                                        <img className="img-detail"  src={photo} alt='Imagen de anuncio' ></img>
                                         : 
                                         Ad.photo ?
                                         Ad.photo.includes('http')?   
                                            <img className="img-detail"  src={createParent===true ?'':Ad.photo} alt='Imagen de anuncio' ></img> 
                                            :
                                            <img   className="img-detail" src={createParent===true ?'':'http://localhost:3001/'+ Ad.photo} alt='Imagen de anuncio' ></img>
                                            :
                                            '' 
                                        } 
                                {loading===true ? 
                                    <h3 >Guardando...</h3>
                                    :
                                    ''
                                }
                                <div className='sweet-loading'>
                                    <ClipLoader
                                    css={override}
                                    sizeUnit={"px"}
                                    size={150}
                                    color={'#123abc'}
                                    loading={loading}
                                    />
                                   
                                </div>    

                                        {afterSave===true ? 
                                        <h3 >{afterSaveMessage}</h3>
                                        :
                                        ''
                                        }
                                    </div>
                                    <div className="content"> 
                                        
                <form
                    onSubmit={e=> {
                            
                        e.preventDefault();
                        updateLoading(true);
                       
                     if (createParent===true){
                       
                     saveNew();
                        console.log('guarda');
                     }
                     else {
                        
                      saveChanges(); 
                      console.log('edita'); 
                     }
                  }
                    
                }          
                >           
                        {/* <div className="uk-column-1-2@m uk-margin"> */}
                            <div className="uk-margin" uk-margin="true" >
                             <label for="name">Nombre</label>
                                <input 
                                    name="name"
                                    className="uk-input"
                                    type="text"
                                    placeholder="Nombre de Anuncio"
                                     
                                    value={ name  }
                                   onChange={e=>onNameChange(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="uk-margin" uk-margin="true" >
                            <label for="description">Descripcion</label>
                                <textarea 
                                    name="description"
                                    className="uk-input"
                                    type="text"
                                    placeholder="Description"
                                    value={ description }
                                    onChange={e=>onDescriptionChange(e.target.value)}
                                    required
                                    
                                />
                            </div>

                            <div className="uk-margin" uk-margin="true" >
                            <label for="price">Precio</label>
                                <input 
                                    name="price"
                                    className="uk-input"
                                    
                                    placeholder="Precio de Articulo"
                                     type="numeric"
                                    value={ price  }
                                    onChange={e=>onPriceChange(e.target.value)}
                                    required
                                />
                            </div>

                            { createParent===true }
                            <div className="uk-margin" uk-margin="true" >
                            <label for="Photo">URL de la foto</label>
                                <input 
                                    name="photo"
                                    className="uk-input"
                                    type="text"
                                    placeholder="url imagen"
                                    value={ photo }
                                   required
                                    onChange={e=>onPhotoChange(e.target.value)}
                                    
                                />
                            </div> 
                                
                            
                            <div className="uk-margin" uk-margin="true" >
                            <label for="type">Tipo transaccion</label>
                                <select 
                                className="uk-select"
                                name="type"
                               onChange={e=>onTypeChange(e.target.value)}
                                value={type}
                                required
                                >
                                    <option key={'Sell'} value="sell" >Sell</option>
                                    <option key={'Buy'} value="buy" >Buy</option>
                                </select>
                            </div>

           
                            <label className="uk-text-left" for="name">Tags</label>
                            <div  name="tags" id="tags" className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                            {
                                tags.map(tag=>

                                    <label key={tag}><input key={tag} className="uk-checkbox" type="checkbox" id={tag} 
                                   checked={selected.includes(tag)  ? true :false}
                                    onChange={tagsChanged} 
                                  // onClick={tagsChanged}
                                    value={tag} 
                                    //ref={'check'+tag}
                                    />{tag}</label>
    
                                )
                            }

                            </div>
                            
                            <div>
                                <input type="submit" className="uk-button uk-button-danger"
                                value= {createParent===true ?  'Guardar':'Guardar Cambios'}       />
                                
                            </div>
             </form>

         
                                     
                                    </div>
                              </div>
                                    
               
                  
             </Fragment>
        );
  }
 
export default CreateEdit;