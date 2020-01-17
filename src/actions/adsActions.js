import{
  START_GET_ADS,
  GET_ADS_SUCCESS,
  GET_ADS_FAILURE,
  START_SAVE_AD,
  SAVE_AD_SUCCESS,
  SAVE_AD_FAILURE

} from '../types';

import axios from 'axios';
//import { getAds } from '../Api/Api';
//const API_KEY = '0d0caf028c5c1dd84e45902321bd3622';
const API_URL='http://localhost:3001/'

export  function  getAdAction  (id) {
    return async (dispatch)=>{
         dispatch(startGetAds());
         try {
            const requestUrl=API_URL+'apiv1/'+id;
            
             const response = await axios.get(requestUrl);
           
             let data  = await response.data.results;
            console.log('ad develto');
            console.log(id);
            console.log(data);
             dispatch(getAdsSuccess(data));
               
         } catch (error) {
             console.log(error);
             dispatch(getAdsFailure());
         }
     }
 }

 export  function  saveAdAction  (ad) {
    return async (dispatch)=>{
         dispatch(startSaveAd());
         try {
            const requestUrl=API_URL+'apiv1/anuncios/';
            console.log('desde action '+requestUrl);
            console.log(ad);
            const response = await axios.post(requestUrl,ad);
            console.log(response); 
            dispatch(saveAdSuccess(ad));
               
         } catch (error) {
             console.log(error);
             dispatch(getAdsFailure());
         }
     }
 }

 export function  updateAdAction (ad){
    return  async(dispatch)=>{
    try{
        dispatch(startSaveAd());

        const requestUrl=API_URL+'apiv1/anuncios/'+ad.id;
        console.log('desde action '+requestUrl);
        console.log(ad);
        const response=await axios.put(requestUrl,ad)
        console.log(response);
        dispatch(saveAdSuccess(ad));
                 
    }
    catch (error) {
        console.log(error);
        dispatch(saveAdFailure());
        throw(error);
    } 
  }
}

export  function  getAdsAction  (ads) {
   return async (dispatch)=>{
        dispatch(startGetAds());
        try {
            const requestUrl=API_URL+'apiv1/anuncios'
           
            const response = await axios.get(requestUrl);
          
            let data  = await response.data.results;
           
            dispatch(getAdsSuccess(data));
              
        } catch (error) {
            console.log(error);
            dispatch(getAdsFailure());
        }
    }
}



export  function  filterPriceAction  (price) {
    return async (dispatch)=>{
         dispatch(startGetAds());
         try {
     
            const requestUrl=API_URL+'apiv1/anuncios?price='+price.price1+'-'+price.price2;
        
             const response = await axios.get(requestUrl);
          
             const data  = await response.data.results;
            
             
             dispatch(getAdsSuccess(data));


               
         } catch (error) {
             console.log(error);
             dispatch(getAdsFailure());
         }
     }
 }

 export  function  filterNameAction  (name) {
    return async (dispatch)=>{
         dispatch(startGetAds());
         try {
         let requestUrl;
         if (name!=='') {
            requestUrl =API_URL+'apiv1/anuncios?name='+name;
         }  
         else{
            requestUrl=API_URL+'apiv1/anuncios'
         }
             console.log(requestUrl);
             const response = await axios.get(requestUrl);
            console.log(response);
             const data  = await response.data.results;
             console.log('devuelvo '+data);
             
             dispatch(getAdsSuccess(data));
               
         } catch (error) {
             console.log(error);
             dispatch(getAdsFailure());
         }
     }
 }

 export  function  filterTagAction  (tag) {
    return async (dispatch)=>{
         dispatch(startGetAds());
         try {
            const requestUrl=API_URL+'apiv1/anuncios?tag='+tag;
            // console.log(requestUrl);
             const response = await axios.get(requestUrl);
            //console.log(response);
             const data  = await response.data.results;
             //console.log('devuelvo '+data);
          //   return data;  
           dispatch(getAdsSuccess(data));


               
         } catch (error) {
             console.log(error);
             dispatch(getAdsFailure());
         }
     }
 }

 export const saveAdSuccess=ads=>({
    type:SAVE_AD_SUCCESS,
    payload:ads
})

export const startSaveAd = () => ({
    type: START_SAVE_AD
})

export const saveAdFailure = () => ({
    type: SAVE_AD_FAILURE
})

export const getAdsSuccess=ads=>({
    type:GET_ADS_SUCCESS,
    payload:ads
})

export const startGetAds = () => ({
    type: START_GET_ADS
})

export const getAdsFailure = () => ({
    type: GET_ADS_FAILURE
})

 

