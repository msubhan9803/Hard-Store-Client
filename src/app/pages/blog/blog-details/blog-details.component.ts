import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/shared/services/blog.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {

  public currentRecId: string;
  public image;
  public description;
  public imageAddress: string;
  public blogDetails = {
    createdAt: "",
    description: "",
    imgUrl: "",
    slug: "",
    tags: "",
    title: "",
    updatedAt: ""
  }

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    document.documentElement.style.setProperty('--theme-deafult', '#5d7227');
    document.documentElement.style.setProperty('--theme-gradient1', '#5d7227');
    document.documentElement.style.setProperty('--theme-gradient2', '#203f15');
    this.currentRecId = this.route.snapshot.paramMap.get('id');
    this.imageAddress = this.productService.getImageUrl();
    this.blogService.getBlogById(this.currentRecId).subscribe(
      (res: any) => {
        this.blogDetails = {
          createdAt: res.createdAt,
          description: res.description,
          imgUrl: this.imageAddress + res.imgUrl,
          slug: res.slug,
          tags: res.tags,
          title: res.title,
          updatedAt: res.updatedAt
        }
      }
    )
  }

}
