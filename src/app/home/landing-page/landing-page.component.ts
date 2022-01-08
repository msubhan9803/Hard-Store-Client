import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor() {
    localStorage.setItem("hrdtkr_minPrice_filter", JSON.stringify(0));
    localStorage.setItem("hrdtkr_maxPrice_filter", JSON.stringify(100000));
    localStorage.setItem("hrdtkr_product_title", JSON.stringify(""));
    localStorage.setItem("hrdtkr_collections_filter", JSON.stringify([]));
  }

  ngOnInit(): void {
  }

}
