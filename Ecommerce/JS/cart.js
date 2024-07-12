
//let container = document.querySelector('.products');

let productList = [];
let filtred = [];

let totalQuantity = window.localStorage.getItem('totalQuantity');
let totalPrice = window.localStorage.getItem('totalPrice');

let totalPriceValue = document.querySelectorAll('.total-price');
let productNumber = document.querySelector('.product-number');
let cartContainer = document.querySelector('.cart-container');
let clearBtn = document.querySelector('.clear');



//Function

function updatePriceQuantitySpan(){

    totalPriceValue.forEach(e=>{
        e.innerText=totalPrice;

    })

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

/* Recuperer les Données  */
function getDataFromLocalStorage() {


    let products = window.localStorage.getItem('productList');
    let quantity = window.localStorage.getItem('totalQuantity');
    let price = window.localStorage.getItem('totalPrice');



    if ((products != null) && (quantity != null) && (price != null)) {
        productList = JSON.parse(products);
        totalQuantity = parseInt(quantity);
        totalPrice = parseInt(price);

        //update price and quantity span
        updatePriceQuantitySpan();
    }
}



/*Delete  product from local storage  */
function deleteProduct(id){


        let index=-1;
        productList.map(e=>{
            index++;
            if(e.id==id){
                productList.splice(index,1);

            }
        })

        updateLocalStorage();
}



/* Update quantity  */

function decrQuantit(id,price,quant){



    productList.map(e=>{

        if(e.id==id){



            if(quant>0){

                e.quantity=quant;



            }

          updateLocalStorage();


        }

    })


    }




function incrQuantit(id){

    productList.map(e=>{

        if(e.id==id){
            quant=e.quantity;
            quant+=1;


                e.quantity=quant;


        }
    })

   //update local storage

    updateLocalStorage();
}



/* Recuperer donnees du JSON */


function getDataFromJSON(url) {

    fetch(url)
        .then(response => response.json())
        .then(data => {

            productList.map(product => {


                filtred.push(data[product.id])

            })

            displayData(filtred);


            let addBtn = document.querySelectorAll('.increase');
            let minusBtn = document.querySelectorAll('.decrease');
            let deleteBtn = document.querySelectorAll('.fa-trash-can');


            deleteBtn.forEach(btn => {
                btn.addEventListener('click', () => {
                    let id=btn.parentElement.parentElement.dataset.id;

                    let element=btn.parentElement.parentElement;
                    let quant=parseInt(btn.parentElement.parentElement.children[2].children[1].innerText);
                    let price=parseInt(btn.parentElement.parentElement.children[1].children[1].innerText);

                    deleteProduct(id,price);
                    element.remove();
                    updateLocalStorage();
                    updatePriceQuantitySpan();
                })
            })


            addBtn.forEach(btn => {
                btn.addEventListener('click', () => {
                    let quantityValue = btn.parentElement.children[1].innerText;
                    let id=btn.parentElement.parentElement.dataset.id;
                    let price=parseInt(btn.parentElement.parentElement.children[1].children[1].innerText);


                    totalPrice+=price;
                    btn.parentElement.children[1].innerText= parseInt(quantityValue)+1;
                    totalQuantity++;
                    incrQuantit(id);
                    updatePriceQuantitySpan();


                })
            })

            minusBtn.forEach(btn => {
                btn.addEventListener('click', () => {
                    let quantityValue = btn.parentElement.children[1].innerText;
                    let element=btn.parentElement.parentElement

                    btn.parentElement.children[1].innerText= parseInt(quantityValue)-1;
                    let id=btn.parentElement.parentElement.dataset.id;
                    let price=parseInt(btn.parentElement.parentElement.children[1].children[1].innerText);

                    totalPrice-=price;
                    totalQuantity-=1;
                    quantityValue-=1;

                    decrQuantit(id,price,quantityValue);

                    if(quantityValue==0){
                        element.remove();
                        deleteProduct(id);
                    }


                      updatePriceQuantitySpan();

                      updateLocalStorage()

                })
            })

            clearBtn.addEventListener('click',()=>{

                console.log('Clear ');

                productList=[];
                cartContainer.innerHTML='';
                totalPrice=0;
                totalQuantity=0;
                updateLocalStorage();
                updatePriceQuantitySpan();
            })



        })


};


// enable paiment where user is logged in

let logged_in=window.localStorage.getItem('logged_in');


if(logged_in=='true'){

    let checkOutBtn=document.querySelector('.checkout');
    let cnxLink=document.querySelector('.cnx-link');

     checkOutBtn.disabled=false;
     cnxLink.style.display = "none"


}



/* Afficher les Produits Selectionnés*/
function displayData(list) {



    let quant = 0;
    list.forEach(product => {

        productList.forEach(element => {
            if (element.id == product.id)
                quant = element.quantity;
        });

        cartContainer.innerHTML += `
    <article class="product flex" data-id="${product.id}">

    <button><i class="fa-solid fa-trash-can"></i></button>
    <p class="price">
    <span >$</span>   <span >${product.price}</span> </p>

    <div class="flex" style="margin-right: 1rem;">
        <button class="decrease">-</button>
        <div class="quantity flex">${quant}</div>
        <button class="increase">+</button>
    </div>

    <p class="title">${product.title}</p>

    <img src="${product.image}" alt="" style="border-radius: 0.22rem; width: 70px; height: 70px;" >


    </article>
    `

    });

}
getDataFromLocalStorage();
getDataFromJSON('../products.json');


console.log(JSON.stringify(productList));
