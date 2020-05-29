var input = document.querySelector('#input')

var Enter=document.querySelector('#search_button');
Enter.addEventListener('click',(e)=>
{
    e.preventDefault();    
    
    var messageOne = document.querySelector('#message1');
    var messageTwo = document.querySelector('#message2');
    var messageThree = document.querySelector('#message3');

    var city=input.value
  
    fetch('http://localhost:3000/weather?address='+city).then((res)=>
    {
      
        res.json().then((data)=>
        {
            if(data.error)
            {
                messageTwo.textContent='';
            messageThree.textContent='';
                return messageOne.textContent=data.error;

            }
            else{
  
            // console.log(data);
            messageOne.textContent=data.area;
            messageTwo.textContent=data.curr;
            messageThree.textContent=data.temp;
            }
        })
    
    })




})
