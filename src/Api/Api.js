import axios from 'axios';
//const API_KEY = '0d0caf028c5c1dd84e45902321bd3622';
const API_URL='http://localhost:3001/'



export const  getAds= async () =>{
    const requestUrl=API_URL+'apiv1/anuncios'
   // console.log(requestUrl);
    const response = await axios.get(requestUrl);
   //console.log(response);
    let data  = await response.data.results;
    console.log(data);
    return data;   
}

export const  getAd= async (id) =>{
    const requestUrl=API_URL+'apiv1/anuncios/?_id='+id;
   // console.log(requestUrl);
    const response = await axios.get(requestUrl);
   //console.log(response);
    const data  = await response.data.results;
    console.log(data);
    return data;   
}
