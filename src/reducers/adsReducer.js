import{
    START_GET_ADS,
    GET_ADS_SUCCESS,
    GET_ADS_FAILURE,

} from '../types';

const initialState={
    tags:[],
    ads:[],
    error:null,
    loading:false,
    ad:{}
}

export default function(state=initialState,action){
    switch(action.type){
            case START_GET_ADS:
                return{
                    ...state,
                    loading:true,
                    ad:{}
                }
            case GET_ADS_SUCCESS:
                    return{
                        ...state,
                        ads:action.payload,
                        loading:false,
                        error:false,
                        ad:{}
                    }
            case GET_ADS_FAILURE:
                    return{
                        ...state,
                        ads:[],
                        loading:false,
                        error:true,
                        ad:{}
                    }    
                    // case FILTER_PRICE:
                    //     return{
                    //         ...state,
                    //         loading:true,
                    //         ad:{}
                    //     }                                                 
            default:
                    return state;
    }
}