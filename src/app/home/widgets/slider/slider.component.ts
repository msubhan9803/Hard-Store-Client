import { Component, OnInit, Input } from '@angular/core';
import { HelperMethodsService } from 'src/app/shared/services/helper-methods.service';
import { HomeSlider } from '../../../shared/data/slider';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  
  @Input() sliders: any[];
  @Input() class: string;
  @Input() textClass: string;
  @Input() category: string;
  @Input() buttonText: string;
  @Input() buttonClass: string;

  constructor(
    public helperMethodsService: HelperMethodsService
  ) { }

  ngOnInit(): void {
  }

  public HomeSliderConfig: any = HomeSlider;

}
