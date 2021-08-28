import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { monthNames } from '../shared/data/other';
import { HelperMethodsService } from '../shared/services/helper-methods.service';
import { OrderService } from '../shared/services/order.service';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-trackorder',
  templateUrl: './trackorder.component.html',
  styleUrls: ['./trackorder.component.scss']
})
export class TrackorderComponent implements OnInit {
  public showTimeLine = false;
  public showProducts = false;
  public searchValue = "";
  public imageAddress = "";
  public monthNames = monthNames;
  public tracking_Status = {
    order_Confirmed: {
      date: null,
      status: "",
      disabled: false,
      completed: false,
      inProgress: false,
      cancelled: false
    },
    ready_for_Delivery: {
      date: null,
      status: "",
      disabled: false,
      completed: false,
      inProgress: false,
      cancelled: false
    },
    out_For_Delivery: {
      date: null,
      status: "",
      disabled: false,
      completed: false,
      inProgress: false,
      cancelled: false
    },
    delivered: {
      date: null,
      status: "",
      disabled: false,
      completed: false,
      inProgress: false,
      cancelled: false
    },
    Paid: {
      date: null,
      status: "",
      disabled: false,
      completed: false,
      inProgress: false,
      cancelled: false
    },
  };
  public product_List = [];
  public themeFooterLogo: string = 'assets/images/logo-new.png';

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    public helperMethodsService: HelperMethodsService
  ) { }

  ngOnInit(): void {
    this.imageAddress = this.productService.getImageUrl();
    document.documentElement.style.setProperty('--theme-deafult', '#5d7227');
    document.documentElement.style.setProperty('--theme-gradient1', '#5d7227');
    document.documentElement.style.setProperty('--theme-gradient2', '#203f15');
  }

  public searchOrder(e) {
    e.preventDefault();

    if (this.searchValue == "") {
      Swal.fire({
        icon: 'error',
        title: "Please provide Order Id",
        showConfirmButton: false,
        timer: 1500
      })
      return;
    }
    this.product_List = [];
    this.orderService.getOrderbyId(this.searchValue).subscribe(
      async (res: any) => {
        Object.entries(res.tracking_Status).forEach(([key, value]) => {
          if (key != "current_Status") {
            let status = {
              date: res.tracking_Status[key].date ? new Date(res.tracking_Status[key].date) : null,
              status: res.tracking_Status[key].status ? res.tracking_Status[key].status : null,
              // disabled: key != this.current_Status ? true : false,
              completed: res.tracking_Status[key].status == "completed" ? true : false,
              inProgress: res.tracking_Status[key].status == "inProgress" ? true : false,
              cancelled: res.tracking_Status[key].status == "cancelled" ? true : false
            }

            this.tracking_Status[key] = status;
          }
        });

        console.log("this.tracking_Status: ", this.tracking_Status)

        this.product_List = res.products;

        this.showTimeLine = true;
        this.showProducts = true;
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: "Invalid Order Id",
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }
}
