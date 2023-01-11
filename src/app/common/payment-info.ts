import { StripeCustomer } from "./stripe-customer";

export class PaymentInfo {
    constructor(public amount?: number, public currency?: string
        // public description?: string, public customer?: StripeCustomer
        ){
        
    }
}
