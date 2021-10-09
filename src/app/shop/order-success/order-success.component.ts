import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit {
  public orderId = "";

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');
  }

}
