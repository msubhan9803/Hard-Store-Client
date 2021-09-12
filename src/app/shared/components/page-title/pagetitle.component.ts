import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pagetitle',
  templateUrl: './pagetitle.component.html',
  styleUrls: ['./pagetitle.component.scss']
})
export class PageTitleComponent implements OnInit {

  @Input() title : string;
  @Input() subtitle? : string;
  @Input() pagetitle : string;

  constructor() {
  }

  ngOnInit() : void {  }

}
