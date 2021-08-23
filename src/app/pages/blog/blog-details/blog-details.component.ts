import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/shared/services/blog.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {

  public currentRecId: string;
  public image;
  public description;

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
  ) { }

  ngOnInit(): void {
    this.currentRecId = this.route.snapshot.paramMap.get('id');
    this.blogService.getBlogById(this.currentRecId).subscribe(
      (res: any) => {
        this.blogDetails = {
          createdAt: res.createdAt,
          description: res.description,
          imgUrl: res.imgUrl,
          slug: res.slug,
          tags: res.tags,
          title: res.title,
          updatedAt: res.updatedAt
        }
      }
    )
  }

}
