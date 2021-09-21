import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating-block',
  templateUrl: './rating-block.component.html',
  styleUrls: ['./rating-block.component.scss']
})
export class RatingBlockComponent implements OnInit {
  @Input() reviewObj = {
    Rating: 0,
    Title: "",
    Comment: "",
    Email: "",
    createdAt: "",
    Name: ""
  };
  isReadonly = true;

  constructor() { }

  ngOnInit(): void {
    console.log("this.reviewObj: ", this.reviewObj)
  }

}
