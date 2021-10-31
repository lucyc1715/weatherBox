import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDqrjLW5sWNZS0hPuV1ewbSCSfyx8o7FDE',
    })
  ],
  exports: [
    FormsModule,
    AgmCoreModule
  ]
})
export class SharedModule { }
