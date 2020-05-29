const request=require('request');

const geocode=(address,callback)=>
{
    
const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic2thbGlidXIiLCJhIjoiY2thNWN2bHF3MDg4eDNlbGhuYzd5ZmlxYSJ9.dMQ-plUwofXdEQ8LKGoO5g&limit=1';

    request({url:url,json:true},(error,response)=>
    {
        if(error)
        {
            callback("Connect to internet",undefined)
        }
        else if( response.body.features.length===0 || response.body.message==='Not Authorized - Invalid Token')
        {
            callback("Not Authorized - Invalid address",undefined)
        }
        else
        {
            callback(undefined,
                {
                    area:response.body.query[0],
                    latitude:response.body.features[0].center[0],
                    longitude:response.body.features[0].center[1]
                })
        }
    })



}
// var res;
// geocode("!",(error,{area,latitude,longitude}={})=>
// {
//     if(error)
//     {
//         res=error;
//         console.log(error);
//     }
//     else
//     {
//         res=data;
//         console.log(data);
//     }
    
// })

module.exports=geocode;