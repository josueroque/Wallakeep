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
 if (adId){
       console.log('hola condicion1'+adId+pathname);
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
           create:false,
           loading:false
         };
         this.getAdvert(adId);
        console.log('hola condicion1'+adId+pathname);
         localStorage.setItem('_id',adId);
        }
        else{
            console.log('hola condicion2'+adId+pathname);
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
                loading:false    
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
                loading:false    
              };  
              console.log('hola condicion3');
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
         //  this.setState({loading:false});  
console.log('seteado '+this.state.loading);
//    }
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
    await this.wait(500);
    this.setState({loading:false});
  //  console.log(response);
}

guardarNuevo=async()=>{
 //this.setState({loading:true});
    let createdAd={
        name:this.state.name,
        description:this.state.description,
        type:this.state.type.toLowerCase(),
        price:this.state.price,
        tags:this.state.selectedTags,
         photo:this.state.photo
    }
    const response=await createAd(createdAd);
    await this.wait(500);
    this.setState({loading:false});
}


onValueChange(e){
    // console.log('desde change');
    // console.log('name'+e.target.name);
    // console.log('value'+e.target.value);
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
    console.log(this.state.name+this.state.description+this.state.price+this.state.type);
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
// componentDidMount(){
//     this.work.current.checked();
// }

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

        return (  
            <Fragment>
            <Navbar />

                
         
                             <div className="detail-section">     
                                    <div className="image-container card-image">
                                        {  this.state.create===true ?
                                        <img  src={this.state.photo} alt='Imagen de anuncio' ></img>
                                         : 
                                         this.state.Ad.photo ?
                                         this.state.Ad.photo.includes('http')?   
                                            <img  src={this.state.Ad.photo} alt='Imagen de anuncio' ></img> 
                                            :
                                            <img  src={'http://localhost:3001/'+this.state.Ad.photo} alt='Imagen de anuncio' ></img>
                                            :
                                            '' 
                                        }    
                                        
                                    </div>
                                    <div className="content"> 

                                     
                                        
                <form
                    onSubmit={e=> {
                        e.preventDefault();

                
                        this.setState({ loading: true });
              
                      
                     if (this.state.create===true){
                       
                        this.guardarNuevo();
                     }
                     else {
                        
                        this.guardarCambios();  
                     }
                     

                    }}          
                >
                            <div className="uk-margin" uk-margin="true" >
                                <input 
                                    name="name"
                                    className="uk-input"
                                    type="text"
                                    placeholder="Nombre de Anuncio"
                                  
                                    value={this.state.name  }
                                    onChange={this.onValueChange}
                                    required
                                />
                            </div>


                            <div className="uk-margin" uk-margin="true" >
                                <textarea 
                                    name="description"
                                    className="uk-input"
                                    type="text"
                                    placeholder="Description"
                                    value={ this.state.description }
                                    onChange={this.onValueChange}
                                    required
                                    
                                />
                            </div>

                            <div className="uk-margin" uk-margin="true" >
                                <input 
                                    name="price"
                                    className="uk-input"
                                    type="numeric"
                                    placeholder="Price"
                                    value={ this.state.price }
                                    onChange={this.onValueChange}
                                    required
                                />
                            </div>
                            { this.state.create===true ?
                            <div className="uk-margin" uk-margin="true" >
                                <input 
                                    name="photo"
                                    className="uk-input"
                                    type="text"
                                    placeholder="url imagen"
                                    value={ this.state.photo }
                                   required
                                    onChange={this.onValueChange}
                                    
                                />
                            </div> :''
                                }
                            
                            <div className="uk-margin" uk-margin="true" >
                                <select 
                                className="uk-select"
                                name="type"
                                onChange={this.onValueChange}
                                value={this.state.type}
                                required
                                >
                                    <option key={'Sell'} value="Sell" >Sell</option>
                                    <option key={'Buy'} value="Buy" >Buy</option>
                                </select>
                            </div>

           

                            <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                            {
                                this.state.tags.map(tag=>
                                    //  <label key={tag}><input key={tag} class="uk-checkbox" type="checkbox" id={tag} 
                                    //  checked={this.state.Ad.tags.includes(tag) ? true : false}
                                    //  onChange={this.checkBoxChange} value={tag}
                                    //  />{tag}</label>
                                    <label key={tag}><input key={tag} className="uk-checkbox" type="checkbox" id={tag} 
                                    checked={this.state.selectedTags.includes(tag) ? true : false}
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

                            <div className='sweet-loading'>
                                    <ClipLoader
                                    css={override}
                                    sizeUnit={"px"}
                                    size={150}
                                    color={'#123abc'}
                                    loading={this.state.loading}
                                    />
                                    
                                </div> 
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