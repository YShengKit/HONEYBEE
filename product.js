// to check whether the body/docs is loaded
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready)
    console.log('loading')
}else if(document.readyState == 'interactive'){
    document.addEventListener('DOMContentLoaded',ready)
    console.log(document.readyState)
}else{
    ready()
    console.log('done')
}

// functions that loaded first
function ready(){
    // check session
    var typeUser = 'user'
    var typeGuest = 'guest'
    var session =JSON.parse(localStorage.getItem('session'))
    for (var i=0; i<session.length; i++){
        if(session[i].TYPE ==typeGuest){
            // loop thru every elements (add to cart btn) (guest)
            var addTocartButtons= document.getElementsByClassName('btn-addToCart')
            for (var i=0; i<addTocartButtons.length;i++){
                var button = addTocartButtons[i]
                button.addEventListener('click',addToCartClicked)
            }
            updateCartNum()  
        }else if (session[i].TYPE ==typeUser){
            console.log(session[i])
            // loop thru every elements (add to cart btn) (user)
            var addTocartButtons= document.getElementsByClassName('btn-addToCart')
            for (var i=0; i<addTocartButtons.length;i++){
                var button = addTocartButtons[i]
                button.addEventListener('click',addToCartClickedUser)
            }
            updateCartNumUser()   
        }
    }

}
// --------------------------------------------------------------
// specific functions

// Add to cart (fetching all elements) -------GUEST--------------
function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var toImg = button.parentElement.parentElement.parentElement
    var title = shopItem.getElementsByClassName('product-name')[0].innerText
    var price = shopItem.getElementsByClassName('product-price')[0].innerText
    var imageSrc = toImg.getElementsByClassName('main-img')[0].src
    var qty = shopItem.getElementsByClassName('qty-input')[0].innerText
    addObject(button,title)
}

// add obj to session storage
function addObject(button,title){
    // session storage obj
    var newCart = new Object();
    var shopItem = button.parentElement.parentElement
    var toImg = button.parentElement.parentElement.parentElement
    newCart.TITLE = shopItem.getElementsByClassName('product-name')[0].innerText;
    newCart.PRICE = shopItem.getElementsByClassName('product-price')[0].innerText;
    newCart.IMGSRC = toImg.getElementsByClassName('main-img')[0].src;
    newCart.QTY = shopItem.getElementsByClassName('qty-input')[0].innerText;
    if(sessionStorage.cart){
        cart= JSON.parse(sessionStorage.getItem('cart'));
    }else{
        cart=[];
    }

    for (var i=0; i<cart.length; i++){
        if (cart[i].TITLE==title){
            console.log('repeated')
            alert('This item is already added to the cart')
            return
        }
    }
    cart.push(newCart )
    sessionStorage.setItem('cart', JSON.stringify(cart));
    // console.log('storage: ',cart[0].TITLE,'html: ',title)
    updateCartNum()
}



// Add to cart (fetching all elements) -------USER--------------
function addToCartClickedUser(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var toImg = button.parentElement.parentElement.parentElement
    var title = shopItem.getElementsByClassName('product-name')[0].innerText
    addObjectUser(button,title)
}

// add obj to session storage
function addObjectUser(button,title){
    // local storage obj
    var newCart = new Object();
    var discount = 1;
    var shopItem = button.parentElement.parentElement
    var toImg = button.parentElement.parentElement.parentElement
    newCart.TITLE = shopItem.getElementsByClassName('product-name')[0].innerText;
    newCart.PRICE = shopItem.getElementsByClassName('product-price')[0].innerText;
    newCart.IMGSRC = toImg.getElementsByClassName('main-img')[0].src;
    newCart.QTY = shopItem.getElementsByClassName('qty-input')[0].innerText;
    newCart.DISCOUNT = discount
    if(localStorage.cart){
        cart= JSON.parse(localStorage.getItem('cart'));
    }else{
        cart=[];
    }

    for (var i=0; i<cart.length; i++){
        if (cart[i].TITLE==title){
            console.log('repeated')
            alert('This item is already added to the cart')
            return
        }
    }
    cart.push(newCart )
    localStorage.setItem('cart', JSON.stringify(cart));
    // console.log('storage: ',cart[0].TITLE,'html: ',title)
    updateCartNumUser()
}


// update cart number real time (navbar)---GUEST----
function updateCartNum(){
    let cart= JSON.parse(sessionStorage.getItem('cart'))
    if(cart===null || cart.length ==0){
        var cartLength =0
    }else{
        var cartLength = cart.length
    }
    document.getElementsByClassName('badge')[0].innerText= cartLength
}

// update cart number real time (navbar)---USER----
function updateCartNumUser(){
    let cart= JSON.parse(localStorage.getItem('cart'))
    if(cart===null || cart.length ==0){
        var cartLength =0
    }else{
        var cartLength = cart.length
    }
    document.getElementsByClassName('badge')[0].innerText= cartLength
}

// cart-num animation (up n down)
function cartAnimation(){
    var badge = document.getElementsByClassName('badge')
    badge[0].classList.add('cart-animation')
}

// sound animation for fun
function addCartSound(url) {
    const audio = new Audio(url);
    audio.play();
}