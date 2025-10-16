import './CheckoutHeader.css'
import './CheckOutPage.css'

import axios from 'axios'
import { useState, useEffect } from 'react'

import { OrderSummary } from './OrderSummary'
import { PaymentSummary } from './PaymentSummary'
import { CheckoutHeader } from './CheckoutHeader'
export function CheckoutPage({ cart }) {
  
  const [deliveryOption, setDeliveryOption] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  useEffect(() => {
    const fetchCheckoutData = (async () => {
      let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
      setDeliveryOption(response.data);
      response = await axios.get('/api/payment-summary')
      setPaymentSummary(response.data);

    })

    fetchCheckoutData();
  }, [])
  return (
    <>
      <title>Checkout</title>
      <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />
      <CheckoutHeader cart = {cart}/>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOption={deliveryOption} />

          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  )
}