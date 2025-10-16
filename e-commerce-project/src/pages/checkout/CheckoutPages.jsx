import './CheckoutHeader.css'
import './CheckOutPage.css'

import axios from 'axios'
import { useState, useEffect } from 'react'

import { OrderSummary } from './OrderSummary'
import { PaymentSummary } from './PaymentSummary'
import { CheckoutHeader } from './CheckoutHeader'
export function CheckoutPage({ cart,totalQuantity, loadCart }) {
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
  }, [cart])
  return (
    <>
      <title>Checkout</title>
      <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />
      <CheckoutHeader cart = {cart} totalQuantity={totalQuantity}/>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOption={deliveryOption} loadCart={loadCart} />

          <PaymentSummary paymentSummary={paymentSummary} loadCart= {loadCart}/>
        </div>
      </div>
    </>
  )
}