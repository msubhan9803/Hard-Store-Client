import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ProductService } from 'src/app/shared/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  public searchValue = new Subject<string>();
  public showSearchedFaq = false;
  public faqList = [];
  public searchValueError = false;

  public faqList$ = this.searchValue.pipe(
    debounceTime(250),
    distinctUntilChanged(),
    switchMap(searchValue => this.productService.searchFaq(searchValue))
  );

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    document.documentElement.style.setProperty('--theme-deafult', '#5d7227');
    document.documentElement.style.setProperty('--theme-gradient1', '#5d7227');
    document.documentElement.style.setProperty('--theme-gradient2', '#203f15');
    // this.updateFaqList("shipping")
    this.productService.getFaq().subscribe(
      (res: []) => {
        this.faqList = res;
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: "Something went wrong!",
          showConfirmButton: false,
          timer: 1500
        })
      }
    )

    this.faqList$.subscribe((res: []) => this.faqList = res)
  }

  searchFaq(searchValue: string) {
    // if (searchValue) {
    //   if (!searchValue.match(/^[0-9a-z]+$/)) {
    //     this.searchValueError = true;
    //   } else {
    //     this.searchValueError = false;
    //     this.searchValue.next(searchValue);
    //   }
    //   this.showSearchedFaq = true;
    // } else {
    //   this.showSearchedFaq = false;
    // }
    this.updateFaqList("shipping", searchValue)
  }

  // onTabChange(faqTypq) {
  //   this.updateFaqList(faqTypq)
  // }

  updateFaqList(faqType, searchValue) {
    this.productService.searchFaq(searchValue).subscribe(
      (res: []) => {
        this.faqList = res;
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: "Something went wrong!",
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }
}
