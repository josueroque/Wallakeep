import{

    START_GET_TAGS,
    GET_TAGS_SUCCESS,
    GET_TAGS_FAILURE
} from '../types';

const initialState={
    tags:[],    
     error:null,
    loading:false,
    tag:{}
}

export default function(state=initialState,action){
    switch(action.type){
        case START_GET_TAGS:
            return{
                ...state,
                loading:true,
                tag:{}
            } 
            case GET_TAGS_SUCCESS:
                    return{
                        ...state,
                        tags:action.payload,
                        loading:false,
                        error:false,
                        tag:{}
                    }
            case GET_TAGS_FAILURE:
                    return{
                        ...state,
                        tags:[],
                        loading:false,
                        error:true,
                        tag:{}
                    }                      
            default:
                    return state;
    }
}