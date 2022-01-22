import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/classes/product';
import { ProductSlider } from 'src/app/shared/data/slider';
import { HelperMethodsService } from 'src/app/shared/services/helper-methods.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-enlargement-slider',
  templateUrl: './enlargement-slider.component.html',
  styleUrls: ['./enlargement-slider.component.scss']
})
export class EnlargementSliderComponent implements OnInit {
  public products: Product[] = [];
  public ProductSlider: any = ProductSlider;
  public imageAddress = "";
  public conversionRate;

  @Input() categories;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public productService: ProductService,
    public userService: UserService,
    private fb: FormBuilder,
    public helperMethodsService: HelperMethodsService
  ) { }

  async ngOnInit(): Promise<void> {
    this.imageAddress = this.productService.getImageUrl();
    this.conversionRate = localStorage.getItem("hrdtkr_conversionRate")
    let categoryId = this.categories.find(cat => cat.CategoryName == "Enlargement")._id;

    let payload = {
      categoryIds: [categoryId],
      minPrice: 0,
      maxPrice: 100000,
      collections: [],
      title: null
    };

    return this.productService.getFilterProductsAPI(payload).toPromise().then(async (products: Array<any>) => {
      this.products = products;
    })
  }

  public redirectToProductsFilterPage(category) {
    this.productService.setFilterCategories(category);
    this.router.navigate(['products']);
  }
}