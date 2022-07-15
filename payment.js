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

function ready(){
    // load format for credit card input
    document.getElementById("card-number").oninput =function(){
        this.value = creditcardFormat(this.value)
    };

    // load format for expiry date input
    document.getElementById("expiration-date").oninput =function(){
        this.value = expirydateFormat(this.value)
    };

    pagechange()
    updatesubTotal()
    updateTotal()
}

// check session and retrieve data
var typeUser = 'user'
var typeGuest = 'guest'
var cartList = JSON.parse(sessionStorage.getItem('cart'));
var cartListUser = JSON.parse(localStorage.getItem('cart'));
var session = JSON.parse(localStorage.getItem('session'));
var btnBackToCart = document.getElementsByClassName('btn-toCart')[0];
var discountSection = document.getElementsByClassName('discount')[0];

// check session (to retrieve from either session/ local)
for (var i=0; i<session.length; i++){
    if(session[i].TYPE ==typeGuest){
        btnBackToCart.href="cart_guest.html";
        for (var i=0; i<cartList.length; i++){
            var title = cartList[i].TITLE
            var price = cartList[i].PRICE
            var imageSrc = cartList[i].IMGSRC
            var qty = cartList[i].QTY

            var cartRow = document.createElement('div')
            // adding class (for styling)
            cartRow.classList.add('summary-item-each')
            var cartItems = document.getElementsByClassName('summary-items')[0]
            var cartRowContents=`
            <img class="summary-item-image" src="${imageSrc}" width="100" height="100">
            <div class="summary-item-details">
                <div class="summary-item-title">${title}</div>
                <div class="summary-item-price ">${price}</div>
                <div class="summary-quantity-input">Qty:${qty}</div>
            </div>`
            cartRow.innerHTML= cartRowContents
            cartItems.append(cartRow)
        }

    }else if(session[i].TYPE ==typeUser){
        btnBackToCart.href="cart_user.html";
        discountSection.style.display="flex";
        for (var i=0; i<cartListUser.length; i++){
            var title = cartListUser[i].TITLE
            var price = cartListUser[i].PRICE
            var imageSrc = cartListUser[i].IMGSRC
            var qty = cartListUser[i].QTY
        
            var cartRow = document.createElement('div')
            // adding class (for styling)
            cartRow.classList.add('summary-item-each')
            var cartItems = document.getElementsByClassName('summary-items')[0]
            var cartRowContents=`
            <img class="summary-item-image" src="${imageSrc}" width="100" height="100">
            <div class="summary-item-details">
                <div class="summary-item-title">${title}</div>
                <div class="summary-item-price ">${price}</div>
                <div class="summary-quantity-input">Qty:${qty}</div>
            </div>`
            cartRow.innerHTML= cartRowContents
            cartItems.append(cartRow)
        }
    }
}




// discount section (for user only)
function applyDiscount(){
    newTotal =0
    var discount_20 = 0.8
    var discount_50 = 0.5
    var discountInput = document.getElementsByClassName('discount-code')[0]
    var btnDiscount = document.getElementsByClassName('btn-discount')[0]
    var subtotalElement = document.getElementsByClassName('summary-subtotal-price')[0]
    var subtotal = parseFloat(subtotalElement.innerText.replace('RM',''))
    // update in sessionStorage
    data = JSON.parse(localStorage.getItem('cart'))

    if(discountInput.value==='HONEY20BEE'){
        newTotal+=(subtotal*discount_20)
        newTotal = Math.round(newTotal*100)/100
        document.getElementsByClassName('summary-subtotal-price')[0].innerText ='RM'+ newTotal
        for (var i=0; i<data.length; i++){
            console.log(data[i].DISCOUNT)
            data[i].DISCOUNT = discount_20
            localStorage.setItem('cart', JSON.stringify(data));
        }
        updateTotal()
        discountInput.disabled = true
        btnDiscount.disabled = true
    }else if(discountInput.value==='HIVE5HONEY'){
        newTotal+=(subtotal*discount_50)
        newTotal = Math.round(newTotal*100)/100
        document.getElementsByClassName('summary-subtotal-price')[0].innerText ='RM'+ newTotal
        for (var i=0; i<data.length; i++){
            console.log(data[i].DISCOUNT)
            data[i].DISCOUNT = discount_50
            localStorage.setItem('cart', JSON.stringify(data));
        }
        updateTotal()
        discountInput.disabled = true
        btnDiscount.disabled = true
    }else{
        alert('Invalid Discount code')
        discountInput.value=''
        return
    }
    
}

// update subtotal
function updatesubTotal(){
    var cartItemContainer = document.getElementsByClassName('summary-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('summary-item-each')
    var total =0
    for (var i=0; i<cartRows.length; i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('summary-item-price')[0]
        var quantityElement = cartRow.getElementsByClassName('summary-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('RM',''))
        var quantity = quantityElement.innerText.replace('Qty:','')
        total += (price*quantity)
    }
    total = Math.round(total*100)/100
    document.getElementsByClassName('summary-subtotal-price')[0].innerText ='RM'+total.toFixed(2)
}

// update total payable
function updateTotal(){
    var total =0
    var subtotalElement = document.getElementsByClassName('summary-subtotal-price')[0]
    var shippingFeeElement = document.getElementsByClassName('summary-shp-price')[0]
    var subtotal = parseFloat(subtotalElement.innerText.replace('RM',''))
    var shippingfee = parseFloat(shippingFeeElement.innerText.replace('RM',''))
    total += (subtotal+shippingfee)
    total = Math.round(total*100)/100
    document.getElementsByClassName('summary-total-price')[0].innerText ='RM'+total.toFixed(2)
}

// switching different section in forms
function pagechange(frompage, topage) {
    var page=document.getElementsByClassName('info_'+frompage)[0];
    if (!page) return false;
    page.style.visibility='hidden';
    page.style.display='none';

    page=document.getElementsByClassName('info_'+topage)[0];
    if (!page) return false;
    page.style.display='block';
    page.style.visibility='visible';

    return true;
}


// shipping methods
var selections = document.getElementsByClassName('shipping-selections');
var output = document.getElementsByClassName('summary-shp-price');
var i;
for (i = 0; i < selections.length; i++) {
    selections[i].onclick = function(){
        output[0].innerText = this.dataset.fee;
        updateTotal()
    }
}


// forms validation messages
// section 1
function validationSection_1(){
    var fname = document.getElementById('fname').value
    var lname = document.getElementById('lname').value
    var email = document.getElementById('email').value
    var phone = document.getElementById('phone').value

    var namePattern = /^\S{2,30}$/
    var emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    var phonePattern =/^[0-9]{3}-[0-9]{7}$/;
    
    if(fname === '' || lname===''|| email ===''||phone===''){
        alert("Please fill all text fields!!!");
        pagechange(1,1);
        return false;
    }else if (emailPattern.test(email) == false){
        alert('Invalid Email Address');
        pagechange(1,1);
        return false;
    }else if(phonePattern.test(phone)==false){
        alert("Phone number is not in correct format");
        pagechange(1,1);
        return false;
    }else if(namePattern.test(fname)==false ||namePattern.test(lname)==false){
        alert("Do not include space in name");
        pagechange(1,1);
        return false;
    }else{
        pagechange(1,2);
        return true;
    }
}

// section 2
function validationSection_2(){
    var address = document.getElementById('address').value
    var postcode = document.getElementById('postcode').value
    var city = document.getElementById('city').value
    var state = document.getElementById('state').value
    var shippingMethods = document.getElementsByName('shipping-methods')
    
    
    var addressPattern = /[\w\d\s,'.\)\(-]*/;
    var postcodePattern= /[\d]{5,9}/;
    var cityPattern =/[\w\d\s,'.-]*/;
    var statePattern =/[\w\d\s,'.-]*/;


    if(address === '' || postcode===''|| city ===''||state===''){
        alert("Please fill all text fields!!!");
        pagechange(2,2);
        return false;
    }else if (addressPattern.test(address) == false){
        alert('Invalid Address');
        pagechange(2,2);
        return false;
    }else if(postcodePattern.test(postcode) == false){
        alert('Invalid Postcode');
        pagechange(2,2);
        return false;
    }else if(cityPattern.test(city)==false){
        alert("Invalid City");
        pagechange(2,2);
        return false;
    }else if(statePattern.test(state)==false){
        alert("Invalid State");
        pagechange(2,2);
        return false;
    }else if(shippingMethods[0].checked ==false && shippingMethods[1].checked ==false && shippingMethods[2].checked ==false){
        alert("Please Select a shipping method");
        pagechange(2,2);
        return false;
    }else{
        pagechange(2,3);
        return true;
    }
}

// section 3
function validationSection_3(){
    var paymentMethods = document.getElementsByName('payment-methods')
    var cardName = document.getElementById('card-name').value
    var cardNumber = document.getElementById('card-number').value
    var cvv = document.getElementById('cvv').value
    var cardExpiry = document.getElementById('expiration-date').value

    var expirydatePattern = /([0-3][0-9])+\/(\d{2})/;

    if(paymentMethods[0].checked==false && paymentMethods[1].checked==false){
        alert("Please Select a payment method");
        pagechange(3,3);
        return false;
    }else if(cardName===''||cardNumber===''||cvv===''||cardExpiry===''){
        alert("Please fill all text fields!!!");
        pagechange(3,3);
        return false;
    }else if(cardNumber.length<19){
        alert("Invalid Card Number!");
        pagechange(3,3);
        return false;
    }else if(cvv.length<3){
        alert("Invalid CVV!");
        pagechange(3,3);
        return false;
    }else if(expirydatePattern.test(cardExpiry)==false){
        alert("Invalid expiration date!");
        pagechange(3,3);
        return false;
    }else {
        return true;
    }
}

function creditcardFormat(value) {
    // var cardNum = document.getElementById("card-number");
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    var matches = v.match(/\d{4,16}/g);
    var match = matches && matches[0] || ''
    var parts = []

    for (i=0, len=match.length; i<len; i+=4) {
        parts.push(match.substring(i, i+4))
    }

    if (parts.length) {
        return parts.join('-')
    } else {
        return value
    }
}

function expirydateFormat(value) {
    // var cardNum = document.getElementById("card-number");
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    var matches = v.match(/\d{2,4}/g);
    var match = matches && matches[0] || ''
    var parts = []

    for (i=0, len=match.length; i<len; i+=2) {
        parts.push(match.substring(i, i+2))
    }

    if (parts.length) {
        return parts.join('/')
    } else {
        return value
    }
}

