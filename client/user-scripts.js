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
                protectedViews();
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
                protectedViews();
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
        protectedViews();
    }
    
    
    /* *************************
     *** TOKEN CHECKER FUNCTION ***
    ************************** */
    // function protectedViews() {
    //  console.log('protectedViews Function Called')

    // let display = document.getElementById('journals');
    // let header = document.createElement('h5');
    // let accessToken = localStorage.getItem('SessionToken');
    // let alertText = 'Log in or sign up to get started!';

    // for (let i = 0; i < display.childNodes.length; i++){
    //     display.removeChild(display.firstChild);
    // }

    // if(accessToken === 'undefined'){
    //     display.appendChild(header);
    //     header.textContent = alertText;
    //     header.setAttribute('id', 'defaultLogin');
    // } else {
    //     null
    // }
    // }
    // protectedViews();
    

    function protectedViews(){
        const journalPost = document.getElementById('journalEntry');
        const journalView = document.getElementById('journalView');
    
        let token = localStorage.getItem('SessionToken');
        console.log(token);
    
        if(token === 'undefined') {
            journalPost.style.display = 'none';
            journalView.style.display = 'none';
    
            let loginMessage = document.getElementById('login-message');
    
            let message = document.createElement('h1');
            message.setAttribute('id', 'message');
            message.innerText = 'Please login or signup to continue';
            message.style.cssText = `
                position: absolute;
                text-align: center;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            `;
    
            loginMessage.appendChild(message);
        } else {
            let loginMessage = document.getElementById('login-message');
            let message = document.getElementById('message');
            loginMessage.removeChild(message);
    
            journalPost.style.display = 'block';
            journalView.style.display = 'block';
        }
    }
    
    protectedViews();