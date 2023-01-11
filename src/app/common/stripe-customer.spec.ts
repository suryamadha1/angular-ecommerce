import { StripeCustomer } from './stripe-customer';

describe('StripeCustomer', () => {
  it('should create an instance', () => {
    expect(new StripeCustomer()).toBeTruthy();
  });
});
