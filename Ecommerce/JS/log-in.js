const priceIcon=document.querySelector('.fa-bag-shopping');
const quantityIcon=document.querySelector('.product-number');
const emailField=document.querySelector('#email');
const passwordField=document.querySelector('#password');
const cnxBtn=document.querySelector('.btn-primary');
var loggedIn=false;

var users=[]

//get users liste fromlocal storage

 users=JSON.parse(window.localStorage.getItem('users'));


var totalQuantity=parseInt(window.localStorage.getItem('totalQuantity'));
var totalPrice=JSON.parse(window.localStorage.getItem('totalPrice'));




// update total price and quantity fields
  if((totalQuantity==null)||(totalPrice==0)||(totalPrice==null)){
    totalQuantity=0;
    totalPrice=0.00
  }


  priceIcon.innerText=' $ '+totalPrice;
  quantityIcon.innerText=totalQuantity;
 


cnxBtn.addEventListener('click',(e)=>{
    e.preventDefault();

    var email=emailField.value;
    var password=passwordField.value;

    if(users==null){
      users=[];
    }

    var filtred=  users.filter((elm)=>{

    return ((elm.email==email)&&(elm.password==password));
   })

   if(filtred.length!=0){

    loggedIn=true;
    console.log(filtred);

    //rederiction 
    window.location.replace('../pages/index.html')

    //update logged in boolean in local storage

    window.localStorage.removeItem('logged_in');


    window.localStorage.setItem('logged_in',true);



   }else{

    alert('Email ou Mot de passe incorrect');
   }

   
})