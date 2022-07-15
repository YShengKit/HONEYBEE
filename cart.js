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
    var session = JSON.parse(localStorage.getItem('session'));

    for (var i=0; i<session.length; i++){
        if(session[i].TYPE ==typeGuest){
            updateCartNum()
            var removeCartItemButtons =document.getElementsByClassName('btn-remove')
            // console.log(removeCartItemButtons)
            // loop thru every elements (remove btn)
            for (var i=0; i<removeCartItemButtons.length; i++){
                var button = removeCartItemButtons[i]
                button.addEventListener('click',removeCartItem)
            }

            // loop thru every elements (quantity btn)
            var quantityInputs = document.getElementsByClassName('cart-increment')
            for (var i=0; i<quantityInputs.length; i++){
                var input = quantityInputs[i]
                input.addEventListener('click',qtyIncrease)
            }

            var quantityInputs = document.getElementsByClassName('cart-decrease')
            for (var i=0; i<quantityInputs.length; i++){
                var input = quantityInputs[i]
                input.addEventListener('click',qtyDecrease)
            }

            //  (checkout btn)
            document.getElementsByClassName('btn-checkout')[0].addEventListener('click',checkoutClicked)

            updateCartNum()
        }else if(session[i].TYPE ==typeUser){
            updateCartNumUser()
            var removeCartItemButtons =document.getElementsByClassName('btn-remove')
            // console.log(removeCartItemButtons)
            // loop thru every elements (remove btn)
            for (var i=0; i<removeCartItemButtons.length; i++){
                var button = removeCartItemButtons[i]
                button.addEventListener('click',removeCartItemUser)
            }

            // loop thru every elements (quantity btn)
            var quantityInputs = document.getElementsByClassName('cart-increment')
            for (var i=0; i<quantityInputs.length; i++){
                var input = quantityInputs[i]
                input.addEventListener('click',qtyIncrease)
            }

            var quantityInputs = document.getElementsByClassName('cart-decrease')
            for (var i=0; i<quantityInputs.length; i++){
                var input = quantityInputs[i]
                input.addEventListener('click',qtyDecrease)
            }

            //  (checkout btn)
            document.getElementsByClassName('btn-checkout')[0].addEventListener('click',checkoutClicked)

            updateCartNumUser()
        }
    }
    
}

// --------------------------------------------------------------------
// retrieve the cart list
var typeUser = 'user'
var typeGuest = 'guest'
var cartList = JSON.parse(sessionStorage.getItem('cart'));
var cartListUser = JSON.parse(localStorage.getItem('cart'));
var session = JSON.parse(localStorage.getItem('session'));
var header = document.getElementsByClassName('cart-header')[0]
var content = document.getElementsByClassName('cart-items')[0]
var total = document.getElementsByClassName('cart-total')[0]
var emptyMsg = document.getElementsByClassName('empty-msg')[0]

// check session (to retrieve from either session/ local)
for (var i=0; i<session.length; i++){
    if(session[i].TYPE ==typeGuest){
        if(cartList===null||cartList.length==0 ){
            header.style.display = "none";
            content.style.display = "none";
            total.style.display = "none";
            emptyMsg.style.display = "flex";

        }else if(cartList.length>=1){
            for (var i=0; i<cartList.length; i++){
                var title = cartList[i].TITLE
                var price = cartList[i].PRICE
                var imageSrc = cartList[i].IMGSRC
                var qty = cartList[i].QTY
                console.log(title,price,imageSrc,qty)
            
                var cartRow = document.createElement('div')
                // adding class (for styling)
                cartRow.classList.add('cart-item-each')
                var cartItems = document.getElementsByClassName('cart-items')[0]
                var cartRowContents=`
                <div class="cart-item ">
                    <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                    <span class="cart-item-title">${title}</span>
                </div>
                <div class="cart-item-price ">${price}</div>
                <div class="cart-quantity ">
                    <button class="cart-decrease btn" ><b>-</b></button>
                    <div class="cart-quantity-input">${qty}</div>
                    <button class="cart-increment btn" ><b>+</b></button>
                    
                    <button class="btn btn-remove" type="button">REMOVE</button>
                </div>`
                cartRow.innerHTML= cartRowContents
                cartItems.append(cartRow)
                updateCartTotal()
                updateCartNum()
            }
        }
        
    }else if(session[i].TYPE ==typeUser){
        if(cartListUser===null||cartListUser.length==0 ){
            header.style.display = "none";
            content.style.display = "none";
            total.style.display = "none";
            emptyMsg.style.display = "flex";
            
        }else if(cartListUser.length>=1){
            for (var i=0; i<cartListUser.length; i++){
                console.log(cartListUser[i].DISCOUNT)
                cartListUser[i].DISCOUNT = 1
                localStorage.setItem('cart', JSON.stringify(cartListUser));
                var title = cartListUser[i].TITLE
                var price = cartListUser[i].PRICE
                var imageSrc = cartListUser[i].IMGSRC
                var qty = cartListUser[i].QTY
                
                console.log(title,price,imageSrc,qty)
            
                var cartRow = document.createElement('div')
                // adding class (for styling)
                cartRow.classList.add('cart-item-each')
                var cartItems = document.getElementsByClassName('cart-items')[0]
                var cartRowContents=`
                <div class="cart-item ">
                    <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                    <span class="cart-item-title">${title}</span>
                </div>
                <div class="cart-item-price ">${price}</div>
                <div class="cart-quantity ">
                    <button class="cart-decrease btn" ><b>-</b></button>
                    <div class="cart-quantity-input">${qty}</div>
                    <button class="cart-increment btn" ><b>+</b></button>
                    
                    <button class="btn btn-remove" type="button">REMOVE</button>
                </div>`
                cartRow.innerHTML= cartRowContents
                cartItems.append(cartRow)
                updateCartTotal()
                updateCartNumUser()
                
            }
        }
        
    }
}
   



// remove cart item --guest
function removeCartItem(event){
    var buttonClicked= event.target
    
    // remove in session storage
    var cart = buttonClicked.parentElement.parentElement
    var getName = cart.getElementsByClassName('cart-item-title')[0].innerText
    for (var i=0; i<cartList.length; i++){
        if (cartList[i].TITLE == getName){
            cartList.splice(i,1);
        }
        updateCartTotal()
    }
    sessionStorage.setItem('cart', JSON.stringify(cartList));
    // remove the entire row
    buttonClicked.parentElement.parentElement.remove()
    // update total price
    updateCartTotal()   
    updateCartNum()
    location.reload(); 
}

// remove cart item --user
function removeCartItemUser(event){
    var buttonClicked= event.target
    
    // remove in session storage
    var cart = buttonClicked.parentElement.parentElement
    var getName = cart.getElementsByClassName('cart-item-title')[0].innerText
    for (var i=0; i<cartListUser.length; i++){
        if (cartListUser[i].TITLE == getName){
            cartListUser.splice(i,1);
        }
        updateCartTotal()
    }
    localStorage.setItem('cart', JSON.stringify(cartListUser));
    // remove the entire row
    buttonClicked.parentElement.parentElement.remove()
    // update total price
    updateCartTotal()   
    updateCartNumUser() 
    location.reload(); 
}





// checkout function
function checkoutClicked(){
    if (document.getElementsByClassName('badge')[0].innerText==0){
        alert('Cart list is empty, please proceed to purchase!')
        location.replace('product3.html')
    }else{
        location.replace('payment.html')
        updateCartTotal()
        // check session
        for (var i=0; i<session.length; i++){
            if(session[i].TYPE ==typeGuest){
                updateCartNum()
            }else if(session[i].TYPE ==typeUser){
                updateCartNumUser()
            }
        }
    }
    
}
// cart-item-title
// qty sections
function qtyIncrease(event){
    let input = event.currentTarget
    var cart = input.parentElement.parentElement
    // console.log(cart)
    var title = cart.getElementsByClassName('cart-item-title')[0].innerText
    var qtyNum = cart.getElementsByClassName('cart-quantity-input')[0].innerText
    let count = parseFloat(qtyNum)
    count+=1
    cart.getElementsByClassName('cart-quantity-input')[0].innerText =count
    updateCartTotal()
    console.log(title,count)
    // check session
    for (var i=0; i<session.length; i++){
        if(session[i].TYPE ==typeGuest){
            updateSStorage(count,title)
        }else if(session[i].TYPE ==typeUser){
            updateLStorage(count,title)
        }
    }
}

function qtyDecrease(event){
    let input = event.currentTarget
    var cart = input.parentElement.parentElement
    // console.log(cart)
    var title = cart.getElementsByClassName('cart-item-title')[0].innerText
    var qtyNum = cart.getElementsByClassName('cart-quantity-input')[0].innerText
    let count = parseFloat(qtyNum)
    count-=1
    if(isNaN(count)||count<=0){
        count=1
    }
    cart.getElementsByClassName('cart-quantity-input')[0].innerText =count
    updateCartTotal()
    console.log(title,count)
    // check session
    for (var i=0; i<session.length; i++){
        if(session[i].TYPE ==typeGuest){
            updateSStorage(count,title)
        }else if(session[i].TYPE ==typeUser){
            updateLStorage(count,title)
        }
    }
}



// update total price
function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-item-each')
    var total =0
    for (var i=0; i<cartRows.length; i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-item-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var p = parseFloat(priceElement.innerText.replace('RM',''))
        var price = p.toFixed(2)
        var quantity = quantityElement.innerText
        total += parseFloat(price*quantity)
        total.toFixed(2)
    }
    // total = Math.round(total*100)/100
    document.getElementsByClassName('cart-total-price')[0].innerText ='RM'+total.toFixed(2)
}

// update cart number (nav bar) --guest
function updateCartNum(){
    let cart= JSON.parse(sessionStorage.getItem('cart'))
    if(cart===null || cart.length ==0){
        var cartLength =0
    }else{
        var cartLength = cart.length
    }
    document.getElementsByClassName('badge')[0].innerText= cartLength
}

// update cart number (nav bar) --user
function updateCartNumUser(){
    let cart= JSON.parse(localStorage.getItem('cart'))
    if(cart===null || cart.length ==0){
        var cartLength =0
    }else{
        var cartLength = cart.length
    }
    document.getElementsByClassName('badge')[0].innerText= cartLength
}

// update session storage (cart--guest)
function updateSStorage(count,title){
    // update in sessionStorage
    data = JSON.parse(sessionStorage.getItem('cart'))
    for (var i=0; i<data.length; i++){
        if(data[i].TITLE ==title){
            // console.log(data[i])
            data[i].QTY = count;
            sessionStorage.setItem('cart', JSON.stringify(data));
        }
        
    }
    
}

// update local storage (cart--user)
function updateLStorage(count,title){
    // update in sessionStorage
    data = JSON.parse(localStorage.getItem('cart'))
    for (var i=0; i<data.length; i++){
        if(data[i].TITLE ==title){
            // console.log(data[i])
            data[i].QTY = count;
            localStorage.setItem('cart', JSON.stringify(data));
        }
    }
}

