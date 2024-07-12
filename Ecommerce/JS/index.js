
let container = document.querySelector('.products');

let productList=[];    

let totalQuantity=0;
let totalPrice=0;
let loggedIn=false;
let totalPriceValue=document.querySelector('.total-price');
let productNumber=document.querySelector('.product-number');



//Functions

/* Recuperer les Données  */
 function getDataFromLocalStorage(){


    let products=window.localStorage.getItem('productList');
    let quantity=window.localStorage.getItem('totalQuantity');
    let price=window.localStorage.getItem('totalPrice');



    if((products!=null)&&(quantity!=null)&&(price!=null)){
        productList=JSON.parse(products);
        totalQuantity=parseInt(quantity);
        totalPrice=parseInt(price);

        totalPriceValue.innerText=totalPrice;
        productNumber.innerText=totalQuantity;

    }
}

/* get total quantity */

function getTotalQuantityFromLS(){
    let quantity=0;
    productList.forEach(e=>{
        quantity+=e.quantity;
    })

    return quantity;
}



/* get total price */

function getTotalPriceFromLS(){
    let price=0;
    productList.forEach(e=>{
        quantity+=e.quantity;
    })

    return quantity;
}



/* Ajouter Produits a la liste */

function addProduct(productId,productPrice){

    let existe=false;
    let quantity;
    
    
                     
                    
    if(productList.length==0){
        productList.push({"id":productId , "quantity":1});
    }else{

        productList.forEach(e=>{
            if(e.id==productId){
                quantity=e.quantity+1;
                e.quantity=quantity;
                existe=true;
            }
        })

        if(existe==false)      
          productList.push({"id":productId , "quantity":1});


    }

    totalPrice+=productPrice;
    totalQuantity++;
    
    totalPriceValue.innerText=totalPrice;
    productNumber.innerText=totalQuantity;


}


/* Update local Storage  */

function updateLocalStorage(){

    localStorage.removeItem('productList');
    localStorage.removeItem('totalQuantity');
    localStorage.removeItem('totalPrice');


    window.localStorage.setItem('productList',JSON.stringify(productList));
    window.localStorage.setItem('totalQuantity',totalQuantity);
    window.localStorage.setItem('totalPrice',totalPrice);



}



/*===========================Fin Functions ============================== */


getDataFromLocalStorage();

updateLocalStorage();


function getDataFromJSON(url) {
   
    fetch(url)
        .then(response => response.json())
        .then(data => {

            data.map(e => {

                container.innerHTML += `
    
                        <article class="card " data-id="${e.id}">
                                
                                

                        <a href="../pages/product-details.html">
                            <img style="width: 266px;" src="${e.image}" alt="" srcset="">

                        </a>


                        <div class="card-content" style="width: 266px;">
                            <h1 class="title">${e.title}</h1>

                            <p class="description">
                                ${e.description}
                            </p>
                            

                        <div class="flex" style="justify-content: space-between; padding-bottom: 0.7rem;">
                            <div class="price">
                                $ <span class="price-value"> ${e.price}</span>
                            </div>
                            <button class="add-to-cart">
                                <i class="fa-solid fa-cart-shopping"></i> Ajouter au panier
                            </button>
                        </div>

                        </div>
                        </article>

            `

            })
        }).then(()=>{
            
            let addtoCartButton=document.querySelectorAll('.add-to-cart');
            let id;
        
            addtoCartButton.forEach(btn=>{

                btn.addEventListener('click',()=>{

                    let id=btn.parentElement.parentElement.parentElement.dataset.id;
                    let productPrice=parseInt(btn.parentElement.firstElementChild.firstElementChild.innerText);
 
                   // console.log(totalPrice +"+"+productPrice +"="+((parseInt(totalPrice))+productPrice));
                    addProduct(id,productPrice);
                    updateLocalStorage();


                })
            });
        });

}
getDataFromJSON('../products.json');



