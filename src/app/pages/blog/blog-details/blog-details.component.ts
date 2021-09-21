import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/shared/services/blog.service';
import { ProductService } from 'src/app/shared/services/product.service';
import Swal from 'sweetalert2';

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
  public reviewForm: FormGroup;
  isReadonly = false;
  max = 5;
  rate = 5;
  public isSubmit = false;
  public reviewsArray = [];

  overStar: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private fb: FormBuilder,
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
    this.createReviewForm();
  }

  onReviewSubmit() {
    this.isSubmit = true;
    if (this.reviewForm.invalid) return;

    let payload = this.reviewForm.value;
    payload.blogId = this.currentRecId;

    this.productService.writeReview(payload).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Successfully Added Review',
          showConfirmButton: false,
          timer: 1500
        });
        window.location.reload();
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: err.error.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  createReviewForm() {
    this.reviewForm = this.fb.group({
      ProductId: [""],
      Name: ["", Validators.required],
      Title: ["", Validators.required],
      Email: ["", Validators.required],
      Comment: ["", Validators.required],
      Rating: [5, Validators.required],
    })
  }

  hoveringOver(value: number): void {
    this.overStar = value;
    // this.percent = (value / this.max) * 100;
  }

  resetStar(): void {
    this.overStar = void 0;
  }
}
