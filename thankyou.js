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
    countdownTimer()
    setInterval(function(){ countdownTimer(); },1000);
    showsubTotal()
    showGrandTotal()
    document.getElementsByClassName('btn-complete')[0].addEventListener('click',pay)
}


// load customer info (forms)
var url = location.href;
var params = (new URL(url)).searchParams;
// get name
var first_name =params.get('fname');
var last_name =params.get('lname');
var full_name = first_name+" "+last_name;
// get address
var address =params.get('address');
var postcode =params.get('postcode');
var city =params.get('city');
var state = params.get('state');
var country =params.get('country');
var address_1 = address
var address_2 = postcode+", "+ city +", "+state
// contact
var email = params.get('email');
var phone =params.get('phone');
// order date
const date= new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var Day = date.getDate();
var Month = months[date.getMonth()];
var Year = date.getFullYear();
var order_date = Day +"/"+ Month +"/"+Year
// payment methods
var paymentMethods =params.get('payment-methods');
// expected arrival date
const expected_date = date.setDate(date.getDate()+5);
var expectedDay = date.getDate();
var expectedMonth = months[date.getMonth()];
var expectedYear = date.getFullYear();
var expectedArrive = expectedDay +"/"+ expectedMonth +"/"+expectedYear
// shipping methods (changes in fee)
var jnt = 'RM5.00'
var poslaju = 'RM4.00'
var ninjavan = 'RM4.50'
var shippingMethods = params.get('shipping-methods')

// assign into html
document.getElementsByClassName('name')[0].innerText = full_name
document.getElementsByClassName('address_1')[0].innerText = address_1
document.getElementsByClassName('address_2')[0].innerText = address_2
document.getElementsByClassName('country')[0].innerText = country
document.getElementsByClassName('email')[0].innerText = email
document.getElementsByClassName('phone')[0].innerText = phone
document.getElementsByClassName('order-date')[0].innerText = order_date
document.getElementsByClassName('payment-methods')[0].innerText = paymentMethods
document.getElementsByClassName('shipping-methods')[0].innerText = shippingMethods
document.getElementsByClassName('expected-date')[0].innerText = expectedArrive
// shipping fee assign
if(shippingMethods=='J&T'){
    document.getElementsByClassName('table-shipping-fee')[0].innerText= jnt
}else if(shippingMethods=='PosLaju'){
    document.getElementsByClassName('table-shipping-fee')[0].innerText= poslaju
}else if(shippingMethods=='NinjaVan'){
    document.getElementsByClassName('table-shipping-fee')[0].innerText= ninjavan
}

// check session &load table
var typeUser = 'user'
var typeGuest = 'guest'
var cartList = JSON.parse(sessionStorage.getItem('cart'));
var cartListUser = JSON.parse(localStorage.getItem('cart'));
var session = JSON.parse(localStorage.getItem('session'));

// check session (to retrieve from either session/ local)
for (var i=0; i<session.length; i++){
    if(session[i].TYPE ==typeGuest){
        for (var i=0; i<cartList.length; i++){
            var index = i+1
            var title = cartList[i].TITLE
            var price = cartList[i].PRICE
            var qty = cartList[i].QTY
            var calcPrice = parseFloat(price.replace('RM',''))
            var t = parseFloat(calcPrice*qty)
            var total = t.toFixed(2)
        
            var cartRow = document.createElement('tr')
            // adding class (for styling)
            cartRow.classList.add('product-row')
            var cartItems = document.getElementsByClassName('products-info')[0]
            var cartRowContents=`
            <td class="table-index">${index}</td>
            <td class="table-item">${title}</td>
            <td class="table-qty">${qty}</td>
            <td class="table-price">${price}</td>
            <td class="per-total">RM${total}</td>
            `
            cartRow.innerHTML= cartRowContents
            cartItems.append(cartRow)
        }
    }else if(session[i].TYPE ==typeUser){
        for (var i=0; i<cartListUser.length; i++){
            var index = i+1
            var title = cartListUser[i].TITLE
            var price = cartListUser[i].PRICE
            var discount = cartListUser[i].DISCOUNT
            var qty = cartListUser[i].QTY
            var calcPrice = parseFloat(price.replace('RM',''))
            var t = parseFloat(calcPrice*qty)
            var priceAfterDiscount = parseFloat(t*discount)
            var total = priceAfterDiscount.toFixed(2)
        
            var cartRow = document.createElement('tr')
            // adding class (for styling)
            cartRow.classList.add('product-row')
            var cartItems = document.getElementsByClassName('products-info')[0]
            var cartRowContents=`
            <td class="table-index">${index}</td>
            <td class="table-item">${title}</td>
            <td class="table-qty">${qty}</td>
            <td class="table-price">${price}</td>
            <td class="per-total">RM${total}</td>
            `
            cartRow.innerHTML= cartRowContents
            cartItems.append(cartRow)
        }
    }
}




// update subtotal
function showsubTotal(){
    var tableRows = document.getElementsByClassName('product-row')
    var total =0
    for (var i=0; i<tableRows.length; i++){
        var cartRow = tableRows[i]
        var perTotalElement = cartRow.getElementsByClassName('per-total')[0]
        var price = parseFloat(perTotalElement.innerText.replace('RM',''))
        total += price
    }
    total = Math.round(total*100)/100
    document.getElementsByClassName('table-subtotal')[0].innerText ='RM'+total.toFixed(2)
}

// update total payable
function showGrandTotal(){
    var total =0
    var subtotalElement = document.getElementsByClassName('table-subtotal')[0]
    var shippingFeeElement = document.getElementsByClassName('table-shipping-fee')[0]
    var subtotal = parseFloat(subtotalElement.innerText.replace('RM',''))
    var shippingfee = parseFloat(shippingFeeElement.innerText.replace('RM',''))
    total += (subtotal+shippingfee)
    total = Math.round(total*100)/100
    document.getElementsByClassName('table-total-payable')[0].innerText ='RM'+total.toFixed(2)
}

function pay(){
    // check session &pay
    var typeUser = 'user'
    var typeGuest = 'guest'
    var session = JSON.parse(localStorage.getItem('session'));
    for (var i=0; i<session.length; i++){
        if(session[i].TYPE ==typeGuest){
            sessionStorage.removeItem('cart')
            location.replace('homepage.html')
        }else if(session[i].TYPE ==typeUser){
            localStorage.removeItem('cart')
            location.replace('homepage_user.html')
        }

    }
    
}

// countdown timer to redirect user to merchant(main page)
// https://stackoverflow.com/questions/12498209/redirect-10-second-countdown
function countdownTimer() {
    var countdownElement = document.getElementById('countdown');
    if (parseInt(countdownElement.innerHTML)<=0) {
        pay()
    }

    if (parseInt(countdownElement.innerHTML)!=0) {
        countdownElement.innerHTML = parseInt(countdownElement.innerHTML)-1;
    }
}