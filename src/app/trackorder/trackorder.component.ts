import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { monthNames } from '../shared/data/other';
import { HelperMethodsService } from '../shared/services/helper-methods.service';
import { OrderService } from '../shared/services/order.service';
import { ProductService } from '../shared/services/product.service';
import { UserService } from '../shared/services/user.service';

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
  @Input() currency: any = this.productService.Currency;
  public monthNames = monthNames;
  public order;
  public conversionRate;
  public tracking_Status = {
    order_Confirmed: {
      date: null,
      status: "",
      disabled: false,
      completed: false,
      inProgress: false,
      cancelled: false,
      comment: ""
    },
    ready_for_Delivery: {
      date: null,
      status: "",
      disabled: false,
      completed: false,
      inProgress: false,
      cancelled: false,
      comment: ""
    },
    out_For_Delivery: {
      date: null,
      status: "",
      disabled: false,
      completed: false,
      inProgress: false,
      cancelled: false,
      comment: ""
    },
    delivered: {
      date: null,
      status: "",
      disabled: false,
      completed: false,
      inProgress: false,
      cancelled: false,
      comment: ""
    },
    Paid: {
      date: null,
      status: "",
      disabled: false,
      completed: false,
      inProgress: false,
      cancelled: false,
      comment: ""
    },
  };
  public product_List = [];
  public themeFooterLogo: string = 'assets/images/footer-enlarged.png';
  public trackingId;
  public live = false;
  public total = 0;

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    public userService: UserService,
    public helperMethodsService: HelperMethodsService,
    private actRoute: ActivatedRoute
  ) {
    this.trackingId = this.actRoute.snapshot.params.id;

    if(this.trackingId) {
      this.searchValue = this.trackingId;
      this.searchOrder();
    }
  }

  async ngOnInit(): Promise<void> {
    this.imageAddress = this.productService.getImageUrl();
    document.documentElement.style.setProperty('--theme-deafult', '#5d7227');
    document.documentElement.style.setProperty('--theme-gradient1', '#5d7227');
    document.documentElement.style.setProperty('--theme-gradient2', '#203f15');
      this.conversionRate = localStorage.getItem("hrdtkr_conversionRate")
  }

  public searchOrder(e?) {
    if (e) e.preventDefault();

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
        this.order = res;
        Object.entries(res.tracking_Status).forEach(([key, value]) => {
          if (key != "current_Status") {
            let status = {
              date: res.tracking_Status[key].date ? new Date(res.tracking_Status[key].date) : null,
              status: res.tracking_Status[key].status ? res.tracking_Status[key].status : null,
              // disabled: key != this.current_Status ? true : false,
              completed: res.tracking_Status[key].status == "completed" ? true : false,
              inProgress: res.tracking_Status[key].status == "inProgress" ? true : false,
              cancelled: res.tracking_Status[key].status == "cancelled" ? true : false,
              comment: res.tracking_Status[key].comment ? res.tracking_Status[key].comment : ""
            }

            this.tracking_Status[key] = status;
          }
        });

        this.product_List = res.products;
        console.log("this.product_List: ", this.product_List)

        this.total = 0;
        this.product_List.forEach(product => {
          this.total += (product.unit_Cost - (product.unit_Cost - product.discount)) * product.quantity;
        })

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
