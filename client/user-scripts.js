/* *************************
*** USER SIGNUP ***
************************** */
function userSignUp() {
    //  console.log('userSignUp Function Called')

    let userEmail = document.getElementById("emailSignup").value;
    let userPass = document.getElementById('pwdSignup').value;

    let newUserData = {
        user: {
            email: userEmail,
            password: userPass
        }
    };
    console.log(`newUserData --> ${newUserData.user.email} ${newUserData.user.password}`);
    
        fetch('http://localhost:3000/user/register', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(newUserData)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let token = data.sessionToken;
                localStorage.setItem('SessionToken', token);
                tokenChecker();
            })
            .catch(err => {
                console.error(err)
            })
        };
    /* *************************
    *** USER LOGIN ***
    ************************** */
    function userLogin() {
    //  console.log('userLogin Function Called')
    let loginEmail = document.getElementById("emailLogin").value;
    let loginPass = document.getElementById('pwdLogin').value;

    let loginUserData = {
        user: {
            email: loginEmail,
            password: loginPass
        }
    };
    console.log(`loginUserData --> ${loginUserData.user.email} ${loginUserData.user.password}`);
    
        fetch('http://localhost:3000/user/login', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(loginUserData)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let token = data.sessionToken;
                localStorage.setItem('SessionToken', token);
                tokenChecker();
            })
            .catch(err => {
                console.error(err)
            })
        };
    
    
    /* *************************
    *** USER LOGOUT ***
    ************************** */
    function userLogout() {
    //  console.log('userLogout Function Called')
        localStorage.setItem('SessionToken', undefined);
        console.log(`sessionToken --> ${localStorage.SessionToken}`);
        tokenChecker();
    }
    
    
    /* *************************
     *** TOKEN CHECKER FUNCTION ***
    ************************** */
    function tokenChecker() {
     console.log('tokenChecker Function Called')

    let display = document.getElementById('journals');
    let header = document.createElement('h5');
    let accessToken = localStorage.getItem('SessionToken');
    let alertText = 'Log in or sign up to get started!';

    for (let i = 0; i < display.childNodes.length; i++){
        display.removeChild(display.firstChild);
    }

    if(accessToken === 'undefined'){
        display.appendChild(header);
        header.textContent = alertText;
        header.setAttribute('id', 'defaultLogin');
    } else {
        null
    }
    }
    tokenChecker();
    