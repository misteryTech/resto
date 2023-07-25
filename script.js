
      $('#slider').owlCarousel({
        loop:true,
        margin:15,
        nav:true,
        autoplay:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:3
            }
        }
}) 
//when clicking buttons he must load the addtocart events 
document.addEventListener('DOMContentLoaded',loadFood);

function loadFood(){
    loadContent();
}
const btnCart = document.querySelector('.btn-cart');



const cart = document.querySelector('.cart');
const btnClose = document.querySelector('#cart-close');

//trigger Css 
btnCart.addEventListener(
            'click',()=>{
                cart.classList.add('cart-active');
});


btnClose.addEventListener(
    'click',()=>{
        cart.classList.remove('cart-active');
});






function removeItem(){
    if(confirm('Are you sure to remove')){
        let title = this.parentElement.querySelector('.cart-food-title').innerHTML;
        itemList = itemList.filter(el => el.title != title);
        this.parentElement.remove();
        loadContent();
    } 
}

function changeQty(){
    if(isNaN(this.value) || this.value < 1 ){
        this.value = 1;
    }
    loadContent();
}


function loadContent(){
    //trigger button add to cart
        let cartBtns = document.querySelectorAll('.add-cart');
        cartBtns.forEach((btn)=>{
            btn.addEventListener('click',addCart);
        });
    
    
    
        let btnRemove = document.querySelectorAll('.cart-remove');
        console.log(btnRemove);
        btnRemove.forEach((btn)=>{
                btn.addEventListener('click',removeItem);
        });
    
        let qtyElements = document.querySelectorAll('.cart-quantity');
        qtyElements.forEach((input)=>{
            input.addEventListener('change',changeQty);
        });
    
    
    
    
        updateTotal();
    }
    

let itemList = [];

function addCart(){
    let food = this.parentElement;
    let id = food.dataset.id;
    let title = food.querySelector('.food-title').innerHTML;
    let price = food.querySelector('.food-price').innerHTML;
    let imgSrc = this.parentElement.querySelector('.food-img').src;

    let newProduct = {id,title,price,imgSrc}

  

        //ignore if not yet in cart
    if(itemList.find((el) => el.title == newProduct.title)){
        alert("Product Already added in cart");
        return;
    }
    else{

        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.push(newProduct);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        
        itemList.push(newProduct);
    }
    let newProductElement = createCartProduct(id,title,price,imgSrc);



    let element = document.createElement('div');

    
    element.innerHTML = newProductElement;
    let cartBasket = document.querySelector('.cart-content');
    cartBasket.append(element);
    loadContent();
}

function createCartProduct(id,title,price,imgSrc){
    return`
        <div class="cart-box">
            <img src="${imgSrc}" class="cart-img">
            <div class="detail-box">
                <div class="cart-food-id">${id}</div>
                <div class="cart-food-title">${title}</div>
                <div class="price-box">
                    <div class="cart-price">${price}</div>
                    <div class="cart-amt">${price}</div>
                </div>
                    <input type="number" value="1" class="cart-quantity">
            </div>
            <i class="fa fa-trash cart-remove"></i>
        </div>
        `;
}

function updateTotal(){
    const cartItems = document.querySelectorAll('.cart-box');
    const totalValue = document.querySelector('.total-price');
    const cartAmount = document.querySelector('.cart-amount')
 
    let total = 0;
    cartItems.forEach(product=>{
        let idElement = product.querySelector('.cart-food-id');
        let priceElement = product.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace("Rs.",""));
        let qty = product.querySelector('.cart-quantity').value;
        total += (price * qty);
        product.querySelector('.cart-amt').innerText =  (price * qty) + " Php" ;

        
    });
    totalValue.innerHTML = total + ' Php';


    const cartCount = document.querySelector('.cart-count');


    let count = itemList.length;
    cartCount.innerHTML = count;

    cartAmount.innerHTML = total + ' Php';


    if(count == 0){
        cartCount.style.display = 'none';
    }
    else{
        cartCount.style.display = 'block';
    }
}

