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
  
   export  function  saveUserAction  (user) {
    return async (dispatch)=>{ 
         dispatch( startSaveUser());
         try {
            localStorage.setItem('name',user.name);
            localStorage.setItem('surname',user.surname);
            localStorage.setItem('tag',user.tag);
           
        //    console.log(user);
           await  dispatch(saveUserSuccess(user));
               
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


  export const startGetUser = () => ({
      type: START_GET_USER
  })
  
  export const getUserFailure = () => ({
      type: GET_USER_FAILURE
  })
  
export const saveUserSuccess=user=>({
    type:SAVE_USER_SUCCESS,
    payload:user
})

export const startSaveUser = () => ({
    type: START_SAVE_USER
})

export const SaveUserFailure = () => ({
    type: SAVE_USER_FAILURE
})

   
  
  