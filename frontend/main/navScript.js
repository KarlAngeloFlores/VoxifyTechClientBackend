const openMenuButton = document.querySelector(".bar-icon");
const navMenu = document.querySelector(".nav-menu");
const btnLogout = document.querySelector(".btnLogout");

const btnMessaged = document.querySelector(".btnMessaged");
btnMessaged.addEventListener("click", () => {
    window.location.href = "messaged.html"
});

const btnHome = document.querySelector(".btnHome");
btnHome.addEventListener("click", () => {
    window.location.href = "home.html"
});

btnLogout.addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "index.html";
})

navMenu.style.maxHeight = "0px";

openMenuButton.addEventListener("click", () => {
    toggleMenu();
});

function toggleMenu() {
    if (navMenu.style.maxHeight === "0px") {
        navMenu.style.maxHeight = "800px";
    } else {
        navMenu.style.maxHeight = "0px";
    }
}