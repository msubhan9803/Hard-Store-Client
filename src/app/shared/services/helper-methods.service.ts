import { Injectable, NgModule } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class HelperMethodsService {
    constructor(
        private router: Router
    ) { }

    public scrollToSection(value, route?) {
        if (value == "contact-section") {
            let el = document.getElementById(value);
            window.scrollTo(0, document.body.scrollHeight);
        } else if (value == "products-section") {
            this.router.navigateByUrl("/").then(res => {
                let el = document.getElementById(value);
                window.scrollTo(0, el.offsetTop)
            })
        } else if (value == "detail-section") {
            let el = document.getElementById(value);
            window.scrollTo(0, el.offsetTop)
        } else {
            window.scrollTo(0, 0)
        }
    }

    public capitalizeFirstLetter(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        // Directly return the joined string
        return splitStr.join(' ');
    }
}