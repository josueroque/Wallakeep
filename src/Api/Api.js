import axios from 'axios';
//const API_KEY = '0d0caf028c5c1dd84e45902321bd3622';
const API_URL='http://localhost:3001/'


export const  getAds= async () =>{
    const requestUrl=API_URL+'apiv1/anuncios'
   // console.log(requestUrl);
    const response = await axios.get(requestUrl);
   //console.log(response);
    let data  = await response.data.results;
    //console.log(data);
    return data;   
}

export const  getAd= async (id) =>{
  //  console.log('el id es'+id);
    const requestUrl=API_URL+'apiv1/anuncios/'+id;
   // console.log(requestUrl);
    const response = await axios.get(requestUrl);
   //console.log(response);
    const data  = await response.data.result;
  //  console.log('devuelvo '+data);
    return data;   
}

export const  getAdName= async (name) =>{

    const requestUrl=API_URL+'apiv1/anuncios?name='+name;
    //console.log(requestUrl);
    const response = await axios.get(requestUrl);
   //console.log(response);
    const data  = await response.data.results;
//    console.log('devuelvo '+data);
    return data;   
}

export const  getTags= async (name) =>{

    const requestUrl=API_URL+'apiv1/tags';
    //console.log(requestUrl);
    const response = await axios.get(requestUrl);
   //console.log(response);
    const data  = await response.data.results;
 //   console.log('devuelvo '+data);
    return data;   
}

export const  filterByPrice= async (p1,p2) =>{

  const requestUrl=API_URL+'apiv1/anuncios?price='+p1+'-'+p2;
 // console.log(requestUrl);
  const response = await axios.get(requestUrl);
 //console.log(response);
  const data  = await response.data.results;
  //console.log('devuelvo '+data);
  return data;   
}

export const  filterByTag= async (tag) =>{
  console.log('desde api tag '+ tag);
    const requestUrl=API_URL+'apiv1/anuncios?tag='+tag;
   // console.log(requestUrl);
    const response = await axios.get(requestUrl);
   //console.log(response);
    const data  = await response.data.results;
    //console.log('devuelvo '+data);
    return data;   
}

export const  updateAd= async (ad) =>{
  try{ 
  const requestUrl=API_URL+'apiv1/anuncios/'+ad.id;
  //  console.log('desde api '+requestUrl);
    const response = await axios.put(requestUrl,ad);
  // console.log('response'+response);
  //  const data  = await response.data.result;
  //  console.log('devuelvo '+data);
    return response;  
   

  } catch (error) {
   
    throw(error);
  } 
}


  export const  createAd= async (ad) =>{
    try {
      const requestUrl=API_URL+'apiv1/anuncios/';
    console.log('desde api Save ');
    console.log(ad);
    //console.log(requestUrl);

    const response = await axios.post(requestUrl,ad);
  // console.log('response'+response);
  //  const data  = await response.data.result;
  //  console.log('devuelvo '+data);
  console.log(response);
    return response;   
    } catch (error) {
     
      throw(error);
    }
    

}
