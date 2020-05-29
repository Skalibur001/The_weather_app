const express=require('express')
const path =require('path')
const hbs=require('hbs')
const geocode=require("../src/utils/geocode");
const forecast=require("../src/utils/forecast");

//run application
const app=express();


//assign doifferent path values
const viewsPath=path.resolve('../','web_servers','templates','views')
//console.log(viewsPath);

const publicDir=path.resolve("../","web_servers","public")
const partialPath=path.resolve('../','web_servers','templates','partials')
//console.log(publicDir);

//handlebars
app.set("view engine","hbs");
app.set("views",viewsPath);
//for partials i.e. header and footer
hbs.registerPartials(partialPath)


app.use(express.static(publicDir))

app.get('',(req,res)=>
{
    res.render('index',
    {
        title:'Weather-app',
        creator:'Saurabh'
    })
})

app.get('/about',(req,res)=>
{
    res.render('about',{
        title:'about page',
        creator:'Saurabh'
    })
})

app.get('/help',(req,res)=>
{
    res.render('help',
    {
        data:'helpful content',
        creator:'Saurabh'
    })
})

app.get('/weather',(req,res)=>
{

    if(req.query.address==='')
        {
            return res.send({error:'Please provide an address'})
        }

            geocode(req.query.address,(error,data)=>
            {
                if(error)
                {
                  return res.send({
                       error:error
                   }) 
                }
                else if(data)
                {
                    forecast(data.latitude=0,data.longitude=0,(err,result)=>
                    {
                        if(err)
                        {
                            return res.send({
                                error:err
                            })
                        }
                        else if(result)
                        {
                            return res.send({
                                area:result.area,
                                curr:result.current,
                                temp:result.temp
                            })
                        }
                    })
                }
            })

})

app.get('*',(req,res)=>
{
res.render('404',
{
    title:'error page',
    creator:'Saurabh'
})
})

// //home
// app.get('',(req,res)=>
// {
//     res.send("home page");
// })


app.listen(3000,()=>
{
    console.log('Server on 3000');
    
})