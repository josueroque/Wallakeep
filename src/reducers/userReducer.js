import{
    START_GET_USER,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    START_SAVE_USER,
    SAVE_USER_SUCCESS,
    SAVE_USER_FAILURE
} from '../types';

const initialState={
user:{}
};

export default function users(state=initialState,action){
    switch(action.type){
        case START_GET_USER:
            return{
                ...state
            } 
        case GET_USER_SUCCESS:
            return{
                ...state,
                user:action.payload,
                error:false,
            }
        case GET_USER_FAILURE:
            return{
                ...state,
                user:{},
                error:true,
            }    
        case START_SAVE_USER:
            return{
                ...state
            } 
        case SAVE_USER_SUCCESS:
            return{
                ...state,
                user:action.user,
                error:false,
            }
        case SAVE_USER_FAILURE:
            return{
                ...state,
                user:{},
                error:true,
            }    
                                                  
        default:
            return state;
    }
}

