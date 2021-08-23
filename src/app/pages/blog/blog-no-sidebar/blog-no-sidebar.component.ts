import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/shared/services/blog.service';

@Component({
  selector: 'app-blog-no-sidebar',
  templateUrl: './blog-no-sidebar.component.html',
  styleUrls: ['./blog-no-sidebar.component.scss']
})
export class BlogNoSidebarComponent implements OnInit {
  public blogs = [];

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe(
      (res: any) => {
        this.blogs = res;
      }
    )
  }

}
