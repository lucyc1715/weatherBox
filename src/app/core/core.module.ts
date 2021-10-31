import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';
import { ToolbarComponent } from '../ui/toolbar/toolbar.component'



@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule
  ],
  exports: [ToolbarComponent]
})
export class CoreModule { }
