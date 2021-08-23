import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/shared/services/blog.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-blog-no-sidebar',
  templateUrl: './blog-no-sidebar.component.html',
  styleUrls: ['./blog-no-sidebar.component.scss']
})
export class BlogNoSidebarComponent implements OnInit {
  public blogs = [];
  public imageAddress;

  constructor(
    private blogService: BlogService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.imageAddress = this.productService.getImageUrl();
    this.blogService.getBlogs().subscribe(
      (res: any) => {
        this.blogs = res;
      }
    )
  }

}
