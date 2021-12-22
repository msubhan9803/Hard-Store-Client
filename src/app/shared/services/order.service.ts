import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EnvironmentUrlService } from './enviroment-url.service';

const state = {
  checkoutItems: JSON.parse(localStorage['hrdtkr_checkoutItems'] || '[]')
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  protected _env: EnvironmentUrlService;
  protected http: HttpClient;
  httpHeaders: any;

  constructor(
    private router: Router,
    injector: Injector,
    private toastrService: ToastrService
  ) {
    this.http = injector.get(HttpClient);
    this._env = injector.get(EnvironmentUrlService);

    // Setting Up token to be passed with request
    // const token = localStorage.getItem('userToken');
    // const SecutiryGroupId = localStorage.getItem("securityGroup");
    // this.httpHeaders = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${token}`,
    //   'GroupId': `${SecutiryGroupId}`
    // });
  }

  /*
    ---------------------------------------------
    --------------- API Order Endpoint  -------------------
    ---------------------------------------------
  */

  // GET: order/getOrderbyId/
  public getOrderbyId(orderId) {
    let url = this._env.urlAddress + 'order/getOrderbyId/' + orderId;

    return this.http.get(url);
  }

  // POST: order/createOrder
  public createOrderAPI(productObj: any) {
    let url = this._env.urlAddress + 'order/createOrder';

    return this.http.post(url, productObj);
  }

  // Get Checkout Items
  public get checkoutItems(): Observable<any> {
    const itemsStream = new Observable(observer => {
      observer.next(state.checkoutItems);
      observer.complete();
    });
    return <Observable<any>>itemsStream;
  }

  // Create order
  public createOrder(product: any, details: any, orderId: any, amount: any) {
    var item = {
      shippingDetails: details,
      product: product,
      orderId: orderId,
      totalAmount: amount
    };
    state.checkoutItems = item;
    localStorage.setItem("hrdtkr_checkoutItems", JSON.stringify(item));
    // console.log("checkoutItems: ", localStorage.getItem("hrdtkr_checkoutItems"));
    localStorage.removeItem("hrdtkr_cartItems");
    this.router.navigate(['/checkout/success', orderId]);
  }
}