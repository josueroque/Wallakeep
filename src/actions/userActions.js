import{

    START_GET_USER,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    START_SAVE_USER,
    SAVE_USER_SUCCESS,
    SAVE_USER_FAILURE,
    USER_EXISTS
} from '../types';
  
  import axios from 'axios';
  //import { getAds } from '../Api/Api';
  //const API_KEY = '0d0caf028c5c1dd84e45902321bd3622';
  const API_URL='http://localhost:3001/'
  
  
  export  function  getUserAction  (user) {
      return async (dispatch)=>{
           dispatch(startGetUser());
           try {
               const user=localStorage.getItem('user');
               console.log(user);
               dispatch(getUserSuccess(user));
                 
           } catch (error) {
               console.log(error);
               dispatch(getUserFailure());
           }
       }
   }
  
    export const getUserSuccess=user=>({
      type:GET_USER_SUCCESS,
      payload:user
  })

  export const userExists=exists=>({
    type:GET_USER_SUCCESS,
    payload:exists
})


  export const startGetUser = () => ({
      type: START_GET_USER
  })
  
  export const getUserFailure = () => ({
      type: GET_USER_FAILURE
  })
  
  
   
  
  