import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { BlogSlider } from '../../../shared/data/slider';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  
  @Input() blogs: any[] = [];
  public imageAddress: string;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.imageAddress = this.productService.getImageUrl();
  }

  public BlogSliderConfig: any = BlogSlider;

}
