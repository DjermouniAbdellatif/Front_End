const btn=document.querySelector('.btn-creation');
const userField=document.querySelector('#user');
const emailField=document.querySelector('#email');
const passwordField=document.querySelector('#password');
const priceIcon=document.querySelector('.fa-bag-shopping');
const quantityIcon=document.querySelector('.product-number');

//get users liste fromlocal storage
  var users=JSON.parse(window.localStorage.getItem('users'));
  var totalQuantity=parseInt(window.localStorage.getItem('totalQuantity'));
  var totalPrice=JSON.parse(window.localStorage.getItem('totalPrice'));

//check users liste

if(users==null) users=[];


// update total price and quantity fields
  if((totalQuantity==null)||(totalPrice==0)||(totalPrice==null)){
    totalQuantity=0;
    totalPrice=0.00
  }
  priceIcon.innerText=' $ '+totalPrice;
  quantityIcon.innerText=totalQuantity;
 

btn.addEventListener('click',(e)=>{
    e.preventDefault();

    if((userField.value=='')||(passwordField.value=='')||(emailField.value=='')){

        alert('Veuillez Remplir les champs !')

    }else{

            let filtred=users.filter(e=>{
                return e.email==emailField.value;
            })

            //user d'ont existe

            if(filtred.length==0){
                users.push({'username':userField.value,
                'email':emailField.value,
                'password':passwordField.value


            })

            window.location.replace('../pages/log-in.html')

            }else{

                alert('user already existe !')

            }

    
        
            
    }
      
       
     window.localStorage.removeItem('users');
     window.localStorage.setItem('users',JSON.stringify(users));
})



