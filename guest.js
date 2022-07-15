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
    checkSession()
}


// check session name
function checkSession(){
    // session key
    let newSession = new Object();
    var sessionName = 'guest'
    var sessionStatus = 'active'
    newSession.TYPE = sessionName
    newSession.STATUS = sessionStatus
    if(localStorage.session){
        session= JSON.parse(localStorage.getItem('session'));
    }else{
        session=[];
    }

    for (var i=0; i<session.length; i++){
        if (session[i].TYPE==sessionName){
            return
        }
    }
    session.push(newSession )
    localStorage.setItem('session', JSON.stringify(session));
}