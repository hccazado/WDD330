document.addEventListener("DOMContentLoaded", (e)=>{
    console.log("doc. loaded and parsed");
})

const form = document.querySelector("#formElement");
let formData = new FormData(form);

form.addEventListener("submit", async (e) =>{
    e.preventDefault();
    console.log("prevented default");
    let dt = new Date(Date.now());
    formData.append("date", dt);
    printForm(form);
});

function printForm(form){
    for (let key of formData.keys()){
        console.log(`Key: ${key} - Data ${formData.get(key)}`);
    }
}