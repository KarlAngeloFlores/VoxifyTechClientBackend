const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const btnLogin = document.querySelector(".btnLogin");

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
            window.location.href = 'home.html';
            
        }
    })
    .catch(error => {
        console.error('Error sending message:', error);
    });
});
