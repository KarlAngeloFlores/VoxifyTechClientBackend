const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const btnLogin = document.querySelector(".btnLogin");
const loginInfo  = document.querySelector(".login-info")

btnLogin.addEventListener("click", () => {
    console.log(emailInput.value);
    console.log(passwordInput.value);
    fetch("https://voxifytechclient.onrender.com/admin/loginAdmin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: emailInput.value,
            password: passwordInput.value
        })
    }).then(response => {
        return response.json();
    }).then(data => {

        if(data.logAdmin) {
 
            sessionStorage.setItem("isLoggedIn", true);
            loginInfo.innerHTML = `Logging in...`
            loginInfo.style.color = "green"
            
            setTimeout(() => {
                window.location.href = 'home.html'
            }, 3000);

        } else {
                loginInfo.innerHTML = `Loading`
                loginInfo.style.color = "black"
            setTimeout(() => {
                loginInfo.innerHTML = `${data.message}`
                loginInfo.style.color = "red"
            }, 1000)

            console.log(data.message)
        }
    })
    .catch(error => {
        console.error('Error sending message:', error);
    });
});
