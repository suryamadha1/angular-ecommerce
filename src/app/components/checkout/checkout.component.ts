import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  // countries
  countries: Country[] = [];

  // states (shipping/ billing)
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];
  
  // credit card
  creditCardYears: number[] = []
  creditCardMonths: number[] = []

  constructor(private formBuilder: FormBuilder, private luv2ShopFormService: Luv2ShopFormService){}
  ngOnInit(): void {

    // populate countries
    this.luv2ShopFormService.getCountries().subscribe(
      data => {
        console.log(`Retrieved Contries: ${JSON.stringify(data)}`);
        this.countries = data;
      }
    )

    // populate credit card months
    const startMonth: number = new Date().getMonth() + 1;
    console.log(`startMonth: ${startMonth}`); 
    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: "+JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );

    // populate credit card years
    this.luv2ShopFormService.getCreditCardYears().subscribe(
      data => {
        console.log("Retrieved credit card years: "+JSON.stringify(data));
        this.creditCardYears = data;
      }
    );




    // check out form
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      }),
    });
  }

  getStates(formGroupName: string){
    const formGroup =  this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup?.value.country.code;

    this.luv2ShopFormService.getStates(countryCode).subscribe(
      data => {
        if(formGroupName === "shippingAddress"){
          this.shippingAddressStates = data;
        } else {
          this.billingAddressStates = data;
        }
      }
    )
  }

  // handle month and years
  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);
    
    let startMonth: number;

    // if current year equals selected year, then start with current month
    if(currentYear === selectedYear){
      startMonth = new Date().getMonth() + 1;
      console.log("works");
      
    } else {
      startMonth = 1;
    }

    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: "+JSON.stringify(data));
        this.creditCardMonths = data;
      }
    )
  }

  copyShippingAddressToBillingAddress(event){
    if(event.target.checked){
      this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }

  }

  onSubmit(){
    console.log("Handling the submit button ");
    console.log(this.checkoutFormGroup.value);
    
  }
}
