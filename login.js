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
    
}


function check() {
    var usrName = document.getElementById('userName').value;
    var usrPw = document.getElementById('userPw').value;

    let stored_users = JSON.parse(localStorage.getItem('users'))
    if(stored_users) {
        for (let u = 0; u < stored_users.length; u++){
            if (usrName == stored_users[u].name && usrPw == stored_users[u].password) {
                window.location.href="homepage_user.html"
                alert('You are logged in ' + usrName); 
                checkSession(usrName)
                return false;
             }
        }
    }
    if (!false) {
        alert('Access denied. Valid username and password is required.'); 
    }
}

function store() {
    var usrName = document.getElementById('userName').value;
    var usrPw = document.getElementById('userPw').value;

    let stored_users = JSON.parse(localStorage.getItem('users'));
     if(stored_users) {
        for (var i=0; i<stored_users.length; i++){
            if(stored_users[i].name ==usrName){
                alert('User already exists!')
                return
            }else if(usrName==''||usrPw==''){
                alert('Valid username and password is required.')
                return
            }
        }
        stored_users.push({name: usrName, password: usrPw});
        localStorage.setItem('users', JSON.stringify(stored_users));
        alert('You have successfully registered ' + usrName);
        /*unable to redirect to afterloginpage*/
    }else {
        localStorage.setItem('users', JSON.stringify([{name: usrName, password: usrPw}]));
    }
    
}

// check session name
function checkSession(user){
    var typeUser = 'user'
    var sessionStatus = 'Login as ' + user
    var typeGuest = 'guest'

    data = JSON.parse(localStorage.getItem('session'))
    for (var i=0; i<data.length; i++){
        if(data[i].TYPE ==typeGuest){
            data[i].TYPE = typeUser;
            data[i].STATUS = sessionStatus
            localStorage.setItem('session', JSON.stringify(data));
        }
        
    }
}


// check session name (sign out)
function signOut(){
    
    var typeUser = 'user'
    var typeGuest = 'guest'
    var sessionStatus ='active'

    data = JSON.parse(localStorage.getItem('session'))
    for (var i=0; i<data.length; i++){
        if(data[i].TYPE ==typeUser){
            // console.log(data[i])
            data[i].TYPE = typeGuest;
            data[i].STATUS = sessionStatus
            localStorage.setItem('session', JSON.stringify(data));
        }
        
    }
}


