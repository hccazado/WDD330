import { getCountryServices } from "./DAOServices.mjs";

const template = (service) =>{
    return `<a target="_blank" href="${service.homePage}">
        <div class="service-card">
            <img src="${service.imageSet.darkThemeImage}" alt="logo from ${service.name}">
            <h3>${service.name}</h3>
        </div>
    </a>`;
}

export class CountryServices{
    constructor(countryCode, container){
        this.countryCode = countryCode;
        this.container = container;
    }

    async init(){
        this.services = await getCountryServices(this.countryCode);
        this.renderServices();
    }

    renderServices(){
        console.log(this.services);
        this.container.innerHTML = "";
        this.services.forEach((service) =>{
            console.log(template(service));
            this.container.insertAdjacentHTML("afterbegin", template(service));
        })
    }
}