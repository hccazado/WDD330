const alertElement = document.querySelector(".alert");

export function displayAlert(message){
    console.log(alertElement);
    alertElement.innerHTML = `Successfully ${message}`;
    alertElement.style.display = "block";
    setTimeout(()=>{
        alertElement.style.display = "none";
    },4000);
}

