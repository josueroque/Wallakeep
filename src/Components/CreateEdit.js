import React,{Component,Fragment} from 'react';
import { getAd,updateAd,createAd } from '../Api/Api';
import Header from './Header';
import UserConsumer from '../context/UserContext';
import { Link } from "react-router-dom";
import{getTags} from '../Api/Api';
import Navbar from './Navbar';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';
//import { Link } from "react-router-dom";
class CreateEdit extends Component {
    constructor(props){
        super(props);
    if (this.props.location.state){
    
        const { adId,pathname } = this.props.location.state;
     //   const {createParent}=this.props.children;
     //   console.log( 'desde start');
 if (adId){
     //  console.log('hola condicion1'+adId+pathname);
        this.state = { 
           _id:adId,
           Ad:[],
           tags:[],
           selectedTags:[],
           name:'',
           description:'',
           price:'',
           type:'' ,
           photo:'',
           create: false,
           loading:false,
           afterSave:false,
           afterSaveMessage:'Datos Guardados!!'
         };
         this.getAdvert(adId);
     //   console.log('hola condicion1'+adId+pathname);
         localStorage.setItem('_id',adId);
        }
        else{
           // console.log('hola condicion2'+adId+pathname);
            this.state = { 
                _id:'',
                Ad:[],
                tags:[],
                selectedTags:[],
                name:'',
                description:'',
                price:'',
                type:'',
                photo:'',
                create:false,
                loading:false, 
                afterSave:false,
                afterSaveMessage:'Datos Guardados!!'   
              };  
        }
    }
        // else if(localStorage.getItem('_id')===undefined ){   
        // const id= localStorage.getItem('_id');
        //     this.state = { 
        //         _id:id,
        //         Ad:[],
        //         tags:[],
        //         selectedTags:[],
        //         name:'',
        //         description:'',
        //         price:'',
        //         type:'',
        //         create:false    
        //       }; 
        //   this.getAdvert(id);

        // }
        else{
            this.state = { 
                _id:'',
                Ad:[],
                tags:[],
                selectedTags:[],
                name:'',
                description:'',
                price:'',
                type:'',
                photo:'',
                create:true,
                loading:false,
                afterSave:false,
                afterSaveMessage:'Datos Guardados!!'    
              };  
             // console.log('hola condicion3');
        }

    this.getAllTags();

    this.checkBoxChange=this.checkBoxChange.bind(this);    
    this.onValueChange=this.onValueChange.bind(this);  
    this.guardarCambios=this.guardarCambios.bind(this);  
    }

componentDidMount(){
//console.log('desde CDM' +this.state.create);
    // if (this.state.create===true){
        
            this.setState({ state: this.state });
            if (this.props.location.state){
                if (this.props.location.state.createParent===true){
                    this.props.location.state.createParent=false;
                    
                }
            }
       //   this.setState({loading:false});  


//    }
}


componentWillUnmount(){
    if (this.props.location.state){
        if( this.props.location.state.createParent===true){
            this.setState({create:true})    
        }
    }
}

 wait=async(ms)=> {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }
guardarCambios=async()=>{
    let editedAd={
        name:this.state.name,
        description:this.state.description,
        type:this.state.type.toLowerCase(),
        price:this.state.price,
        tags:this.state.selectedTags,
        id:this.state._id
    }
//    const response=setTimeout( await updateAd(editedAd),5000);
    const response= await updateAd(editedAd);
    await this.wait(1000);
    this.setState({loading:false,afterSave:true});
    await this.wait(1000);
    this.setState({loading:false,afterSave:false});


  //  console.log(response);
}

guardarNuevo=async()=>{
 //this.setState({loading:true});
 try {
    let createdAd={
        name:this.state.name,
        description:this.state.description,
        type:this.state.type!==''? this.state.type.toLowerCase():'sell',
        price:this.state.price,
        tags:this.state.selectedTags,
         photo:this.state.photo,
         selectedTags:[]
    }
    //console.log(desde guardar)
    const response=await createAd(createdAd);
    await this.wait(1000);
    this.setState({loading:false,afterSave:true});
    await this.wait(1000);
    this.setState({loading:false,afterSave:false});
    await this.wait(1000);
    this.props.history.push("/list");
 } catch (error) {
    await this.wait(1000); 
    this.setState({loading:false,afterSave:true,afterSaveMessage:'Ha sucedido un error!!'});
    await this.wait(1000);
    this.setState({loading:false,afterSave:false,afterSaveMessage:'Datos guardados!!'}); 
 }

}


onValueChange(e){
    //  console.log('desde change');
    //  console.log('name'+e.target.name);
    //  console.log('value'+e.target.value);
    if (this.props.location.state){
        if (this.props.location.state.createParent===true){
            this.props.location.state.createParent=false;
            this.setState({create:true,           
                
               selectedTags:[],
                name:'',
                description:'',
                price:'',
                type:'' ,
                photo:'',})
        }
    }
    switch (e.target.name){
        case 'name':
            this.setState({name:e.target.value});
            break;
        case 'description':
            this.setState({description:e.target.value});
            break;
        case 'price':
            this.setState({price:e.target.value});
            break;
        case 'type':
            this.setState({type:e.target.value});
            break; 
        case 'photo':
            this.setState({photo:e.target.value});
            break;                              
        default:
            break;
    }
  //  console.log(this.state.name+this.state.description+this.state.price+this.state.type);
}

checkBoxChange(e){
// console.log(e.target.value);
// console.log(this.state.selectedTags);
let tagsArray=this.state.selectedTags;
if(tagsArray.includes(e.target.value)){

    let element=tagsArray.indexOf(e.target.value);
    tagsArray.splice(element,1);
    // tagsArray.splice
    // tagsArray.pop(e.target.value);
}
else{
    tagsArray.push(e.target.value);

}
this.setState({
    selectedTags:tagsArray
})
// console.log(this.state.selectedTags);

}

    checkTag(){
        this.work.current.checked();
    }


    getAllTags=async()=>{
        const allTags=await getTags();
    //    console.log('obtengo'+allTags);
        this.setState({
            tags:allTags,
            
        });
    }


    editAdvert=(e)=>{
        e.preventDefault();

    }

    getAdvert=async(id)=>{
        const Advert=await getAd(id);
        this.setState({
            Ad:Advert,
            selectedTags:[...Advert.tags],
            name:Advert.name,
            description:Advert.description,
            price:Advert.price,
            type:Advert.type, 
            photo:Advert.photo
        });


    }

    render() { 




const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

console.log('desde render '+this.state.loading );
console.log('viendo el prop');



//console.log(this.props.location.state.createParent);
let createParent;
if (this.props.location.state){
 if (this.props.location.state.createParent===true){
     createParent=true;
    console.log(this.props.location.state.createParent)
 }
 else{
     createParent=false;
 }
}

        return (  
            <Fragment>
            <Navbar></Navbar> 

                
         
                             <div className="detail-section">     
                                    <div className="image-container card-image">
                                        <h3>Previsualizacion de imagen</h3>
                                        {  this.state.create===true?  
                                        <img className="img-detail"  src={this.state.photo} alt='Imagen de anuncio' ></img>
                                         : 
                                         this.state.Ad.photo ?
                                         this.state.Ad.photo.includes('http')?   
                                            <img className="img-detail"  src={createParent===true ?'':this.state.Ad.photo} alt='Imagen de anuncio' ></img> 
                                            :
                                            <img   className="img-detail" src={createParent===true ?'':'http://localhost:3001/'+this.state.Ad.photo} alt='Imagen de anuncio' ></img>
                                            :
                                            '' 
                                        } 
                                {this.state.loading===true ? 
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
                                    loading={this.state.loading}
                                    />

                                   
                                </div>    

                                        {this.state.afterSave===true ? 
                                        <h3 >{this.state.afterSaveMessage}</h3>
                                        :
                                        ''
                                        }
                                    </div>
                                    <div className="content"> 

                                     
                                        
                <form
                    onSubmit={e=> {
                        e.preventDefault();

                        
                        this.setState({ loading: true });
                        if (this.props.location.state){
                            if (this.props.location.state.createParent===true){
                                this.props.location.state.createParent=false;
                                this.setState({create:true})
                            }
                        }
                      
                     if (this.state.create===true){
                       
                        this.guardarNuevo();
                       // this.setState({create:false});
                     //  this.setTimeout(this.props.history.push("/list"),5000)
                       //this.props.history.push("/list");
                     }
                     else {
                        
                        this.guardarCambios();  
                     }
                     

                    }}          
                >           
                        {/* <div className="uk-column-1-2@m uk-margin"> */}
                            <div className="uk-margin" uk-margin="true" >
                             <label for="name">Nombre</label>
                                <input 
                                    name="name"
                                    className="uk-input"
                                    type="text"
                                    placeholder="Nombre de Anuncio"
                                     
                                    value={ createParent===true  ?'':this.state.name  }
                                    onChange={this.onValueChange}
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
                                    value={ createParent===true ?'':this.state.description }
                                    onChange={this.onValueChange}
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
                                    value={ createParent===true  ?'':this.state.price  }
                                    onChange={this.onValueChange}
                                    required
                                />
                            </div>
                            { this.state.create===true }
                            <div className="uk-margin" uk-margin="true" >
                            <label for="Photo">URL de la foto</label>
                                <input 
                                    name="photo"
                                    className="uk-input"
                                    type="text"
                                    placeholder="url imagen"
                                    value={ createParent===true ?'': this.state.photo }
                                   required
                                    onChange={this.onValueChange}
                                    
                                />
                            </div> 
                                
                            
                            <div className="uk-margin" uk-margin="true" >
                            <label for="type">Tipo transaccion</label>
                                <select 
                                className="uk-select"
                                name="type"
                                onChange={this.onValueChange}
                                value={createParent===true ?'sell':this.state.type}
                                required
                                >
                                    <option key={'Sell'} value="sell" >Sell</option>
                                    <option key={'Buy'} value="buy" >Buy</option>
                                </select>
                            </div>

           
                            <label className="uk-text-left" for="name">Tags</label>
                            <div  name="tags" id="tags" className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                            {
                                this.state.tags.map(tag=>
                                    //  <label key={tag}><input key={tag} class="uk-checkbox" type="checkbox" id={tag} 
                                    //  checked={this.state.Ad.tags.includes(tag) ? true : false}
                                    //  onChange={this.checkBoxChange} value={tag}
                                    //  />{tag}</label>
                                    <label key={tag}><input key={tag} className="uk-checkbox" type="checkbox" id={tag} 
                                   checked={this.state.selectedTags.includes(tag)&&createParent===false ? true : false}
                                    onChange={this.checkBoxChange} value={tag}
                                    />{tag}</label>
                               
                                
                                 
                                )
                            }

                            </div>
                            
                            {/* {  this.state.loading===true ?
                            <span uk-spinner="ratio: 3" className="loader-show"></span>
                            :
                            <span uk-spinner="ratio: 3" className="loader-hide"></span>
                            }        */}
                            {/* {this.state.loading===true ? 
                                <h3 >Guardando...</h3>
                                :
                                ''
                            }
                            {this.state.afterSave===true ? 
                                <h3 >{this.state.afterSaveMessage}</h3>
                                :
                                ''
                            } */}


                            
                        {/* </div>                  */}
                        <div>
                                <input type="submit" className="uk-button uk-button-danger"
                                value= {this.state.create===true ? 'Guardar':'Guardar Cambios'}       />
                                
                            </div>
             </form>

         
                                     
                                    </div>
                              </div>
                                    
               
                  
             </Fragment>
        );

  }
}
 
export default CreateEdit;