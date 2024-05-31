const alertElement = document.querySelector(".alert");

export function displayAlert(message){
    alertElement.innerHTML = `${message}`;
    alertElement.style.display = "block";
    setTimeout(()=>{
        alertElement.style.display = "none";
    },3000);
}

