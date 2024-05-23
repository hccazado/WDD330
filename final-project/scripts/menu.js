const btnMenu = document.getElementById("btn-menu");
btnMenu.addEventListener("click", ()=>{
    const navElement = document.querySelector("nav");
    navElement.classList.toggle("show");
    btnMenu.classList.toggle("show");
})