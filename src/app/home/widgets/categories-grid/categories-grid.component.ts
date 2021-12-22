import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/shared/services/blog.service';
import { HelperMethodsService } from 'src/app/shared/services/helper-methods.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-categories-grid',
  templateUrl: './categories-grid.component.html',
  styleUrls: ['./categories-grid.component.scss']
})
export class CategoriesGridComponent implements OnInit {

  constructor(
    public productService: ProductService,
    public blogService: BlogService,
    public helperMethodsService: HelperMethodsService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {

  }
}