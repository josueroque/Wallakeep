import{
  START_GET_ADS,
  GET_ADS_SUCCESS,
  GET_ADS_FAILURE,

//   FILTER_PRICE,
//   FILTER_NAME
} from '../types';

import axios from 'axios';
//import { getAds } from '../Api/Api';
//const API_KEY = '0d0caf028c5c1dd84e45902321bd3622';
const API_URL='http://localhost:3001/'

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




export  function  filterPriceAction  (price) {
    return async (dispatch)=>{
         dispatch(startGetAds());
         try {
             console.log(price.price1);
            const requestUrl=API_URL+'apiv1/anuncios?price='+price.price1+'-'+price.price2;
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
 

