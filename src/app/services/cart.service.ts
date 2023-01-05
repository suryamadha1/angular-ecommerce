import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];

  // storage for persistence
  // storage: Storage = localStorage;
  storage: Storage = sessionStorage;

  persistCartItems() {
    this.storage.setItem('cartItems',JSON.stringify(this.cartItems));
  }


  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() {

    let data = JSON.parse(this.storage.getItem('cartItems')!);
    if(data !== null){
      this.cartItems = data;
      this.computeCartTotals();
    }
  }

  addToCart(theCartItem: CartItem) {
    // check if we already have item in cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;

    // old method
    // find item in cart based on item id
    // if (this.cartItems.length > 0) {
    //   for (let tempCartItem of this.cartItems) {
    //     if (tempCartItem.id === theCartItem.id) {
    //       existingCartItem = tempCartItem;
    //       break;
    //     }
    //   }
    // }

    // new method
    existingCartItem = this.cartItems.find(
      (tempCartItem) => tempCartItem.id === theCartItem.id
    )!;

    // check if we found it
    alreadyExistsInCart = existingCartItem != undefined;
    if (alreadyExistsInCart) {
      // increment the quantity
      existingCartItem.quantity++;
    } else {
      // just add item to array
      this.cartItems.push(theCartItem);
    }
    // compute cart total price and total quantity
    this.computeCartTotals();
  }

  // remove from cart
  decrementQuantity(theCartItem: CartItem){

    // old method
    // let existingCartItem =  this.cartItems.find(
    //   tempCartItem => tempCartItem.id === theCartItem.id
    // );

    // if(existingCartItem?.quantity === 1){

    //   let restCartItems = this.cartItems.filter(
    //     (tempCartItem) => tempCartItem.id !== theCartItem.id
    //   )!;
    //   this.cartItems = restCartItems;
    // }
    // else {
    //   let newCartItems: CartItem[] = this.cartItems.map(
    //     eachCartItem => {
    //       if(eachCartItem.id === theCartItem.id){
    //         eachCartItem.quantity--;
    //       }
    //       return eachCartItem
    //     }
    //   );
    //   this.cartItems = newCartItems;
    // }
    theCartItem.quantity--;

    if(theCartItem.quantity === 0){
      this.remove(theCartItem);
    } else {
      // compute cart total
      this.computeCartTotals();
    }
 
  }

  remove(theCartItem: CartItem){
    // item index
    const itemIndex = this.cartItems.findIndex(
      tempCartItem => tempCartItem.id === theCartItem.id
    );
    // if found, remove the item from array at given index
    if(itemIndex > -1){
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data for debug
    this.logCartData(totalPriceValue, totalQuantityValue);

    // persist cart data
    this.persistCartItems();
  }



  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(
        `name: ${tempCartItem.name}, quantity: ${tempCartItem.quantity}, unitPrice: ${tempCartItem.unitPrice}, subTotalPrice: ${subTotalPrice}`
      );
    }

    console.log(
      `totalPrice: ${totalPriceValue.toFixed(
        2
      )}, totalQuantity: ${totalQuantityValue}`
    );
  }
}
