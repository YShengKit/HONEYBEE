let img1= document.getElementsByClassName('main-img')[0].src 
let img2= document.getElementsByClassName('sub-img')[0].src
let img3= document.getElementsByClassName('sub2-img')[0].src  
let display = document.getElementsByClassName('display-img')[0].src 
let input = parseFloat(document.getElementsByClassName('qty-input')[0].textContent)
let redHeart = "Images/red-heart.png"
let heartBorder = "Images/heart_border.png"
let heartSRC = document.getElementById('heart-border').src
let count= 1

// Display image section
function change1(){
    if(display!=img1){
        document.getElementsByClassName('display-img')[0].src =img1;
    }else{
        document.getElementsByClassName('display-img')[0].src =img1;
    }
}

function change2(){
    if(display!=img2){
        document.getElementsByClassName('display-img')[0].src =img2;
    }else{
        document.getElementsByClassName('display-img')[0].src =img2;
    }
}

function change3(){
    if(display!=img3){
        document.getElementsByClassName('display-img')[0].src =img3;
    }else{
        document.getElementsByClassName('display-img')[0].src =img3;
    }
}

// Quantity input section
function increment(){
    count+=1
    document.getElementsByClassName('qty-input')[0].textContent = parseFloat(count)
}

function decrease(){
    count-=1
    if(isNaN(count)||count<=0){
        count=1
    }
    document.getElementsByClassName('qty-input')[0].textContent = parseFloat(count)
}


// heart section
function convertHeart(){
    
    document.getElementById('heart-border').src=redHeart
    console.log(heartSRC)
    
}




