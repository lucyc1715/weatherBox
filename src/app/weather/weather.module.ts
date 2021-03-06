import { UserModule } from './../user/user.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../shared/material.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherViewComponent } from './weather-view/weather-view.component';
import { WeatherItemComponent } from './weather-item/weather-item.component';
import { WeatherSearchComponent } from './weather-search/weather-search.component';
import { FirebaseModule } from '../core/firebase.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    WeatherRoutingModule,
    FormsModule,
    FirebaseModule,
    UserModule
  ],
  exports: [
    WeatherViewComponent,
    WeatherItemComponent,
    WeatherSearchComponent
  ],
  declarations: [
    WeatherViewComponent,
    WeatherItemComponent,
    WeatherSearchComponent
  ]
})
export class WeatherModule { }
