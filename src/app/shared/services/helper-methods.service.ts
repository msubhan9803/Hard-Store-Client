import { Injectable, NgModule } from '@angular/core';

@Injectable()
export class HelperMethodsService {
    constructor() { }

    public scrollToSection(value) {
        if (value == "contact-section") {
            let el = document.getElementById(value);
            window.scrollTo(0, document.body.scrollHeight);
        } else if (value == "products-section") {
            let el = document.getElementById(value);
            window.scrollTo(0, el.offsetTop)
        } else {
            window.scrollTo(0, 0)
        }
    }
}