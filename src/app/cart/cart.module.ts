import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartDetailsComponent } from '../components/cart-details/cart-details.component';
import { CartStatusComponent } from '../components/cart-status/cart-status.component';
import { CartRoutingModule } from './cart-routing.module';



@NgModule({
  declarations: [
    CartStatusComponent,
    CartDetailsComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule
  ],
  exports: [
    CartStatusComponent,
    CartDetailsComponent,
  ]
})
export class CartModule { }
