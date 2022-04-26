import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MomentModule } from 'ngx-moment';
import { WebcamModule } from 'ngx-webcam';
import { MinutesToTime } from '../_pipes/minutes-to-time.pipe';
import { NumberToMonth } from '../_pipes/number-to-month.pipe';

@NgModule({
  declarations: [NumberToMonth, MinutesToTime],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    MomentModule,
    WebcamModule,
    FormsModule,
    ImageCropperModule
  ],
  exports:[
    NumberToMonth,
    MinutesToTime
  ]
})
export class SharedModule { }
