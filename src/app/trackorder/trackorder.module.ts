import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackorderComponent } from './trackorder.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    TrackorderComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class TrackorderModule { }
