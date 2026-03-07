document.getElementById("signIn-btn").addEventListener("click", function () {
    event.preventDefault();
    // step-1 get the userName
    const userNameInput = document.getElementById("userName-input");
    const userName = userNameInput.value;
    console.log(userName);

    // step-2 get the PIN
    const pinInput = document.getElementById("pin-input");
    const pinNumber = pinInput.value;
    console.log(pinNumber);

    // step -3 match user name  & pin 

    if (userName == "admin" && pinNumber == "admin123") {
        // step -3.1 if match log in
        alert("log In successfully");
        window.location.assign("./home.html");
    }
    else if (userName != "admin") {
        alert(`Log in failed
            User name is Incorrect!`);
        return;
    }
    // step-3.2 if don't match 
    else {
        alert(`Log in failed
            password is Incorrect!`);
        return;
    }
})