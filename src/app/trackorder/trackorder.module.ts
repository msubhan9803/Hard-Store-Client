import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackorderComponent } from './trackorder.component';
import { SharedModule } from '../shared/shared.module';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { NgStepperModule } from 'angular-ng-stepper';



@NgModule({
  declarations: [
    TrackorderComponent
  ],
  imports: [
    CommonModule,
    SharedModule, 
    CdkStepperModule,
    NgStepperModule
  ]
})
export class TrackorderModule { }
