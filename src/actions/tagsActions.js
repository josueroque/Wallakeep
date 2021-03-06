import{

    START_GET_TAGS,
    GET_TAGS_SUCCESS,
    GET_TAGS_FAILURE,
  } from '../types';
  
  import axios from 'axios';
  //import { getAds } from '../Api/Api';
  //const API_KEY = '0d0caf028c5c1dd84e45902321bd3622';
  const API_URL='http://localhost:3001/'
  
  
  export  function  getTagsAction  (tags) {
      return async (dispatch)=>{
           dispatch(startGetTags());
           try {
              const requestUrl=API_URL+'apiv1/tags';
              const response = await axios.get(requestUrl);
              let data  = await response.data.results;
              dispatch(getTagsSuccess(data));
                 
           } catch (error) {
               console.log(error);
               dispatch(getTagsFailure());
           }
       }
   }
  
    export const getTagsSuccess=tags=>({
      type:GET_TAGS_SUCCESS,
      payload:tags
  })
  
  export const startGetTags = () => ({
      type: START_GET_TAGS
  })
  
  export const getTagsFailure = () => ({
      type: GET_TAGS_FAILURE
  })
  
  
   
  
  