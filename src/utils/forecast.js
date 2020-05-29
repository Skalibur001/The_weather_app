const request=require('request');
//const geocode=require('./geocode.js');
// const latitude=geocode.latitude;
// const longitude=geocode.longitute;

const forecast=(latitude,longitude,callback)=>
{
var url='https://api.darksky.net/forecast/6e970a6382b8e4a71bf756e06508b17a/'+latitude+','+longitude;
request({url:url,json:true},(error,response)=>
{
    if(error)
    {
        callback(error,undefined);
    }
    else if(response.body.code===403)
    {
        callback("Bad request",undefined);
    } 
    else
    {
        callback(undefined,
            {
                area:response.body.timezone,
                current:response.body.currently.summary,
                temp:response.body.currently.temperature
            })
    }

})


}


// forecast( 88.33778,22.54111,(error,data)=>
// {
//     if(error)
//     {
//         console.log(error);
//     }
//     else
//     {
//         console.log(data);
        
//     }

// })

module.exports=forecast;