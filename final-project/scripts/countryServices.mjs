import { getCountryServices } from "./DAOServices.mjs";

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
        this.container.innerHTML = "";
        this.services.forEach((service) =>{
            this.container.insertAdjacentHTML("afterbegin", template(service));
        })
    }
}

const template = (service) =>{
    return `<a target="_blank" class="service-card" href="${service.homePage}">
        <div >
            <img src="${service.imageSet.darkThemeImage}" alt="logo from ${service.name}">
            <h3>${service.name}</h3>
        </div>
    </a>`;
}