
import { Routes, Route } from 'react-router'
import { useState, useEffect, useMemo } from 'react'
import axios from 'axios';
import { HomePage } from './pages/home/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPages'
import { OrdersPage } from './pages/orders/OrdersPage'
import { TrackingPage } from './pages/tracking/TrackingPage'
import { NotFoundPage } from './pages/notfoundpage/NotFoundPage'
import './App.css'

function App() {


  const [cart, setCart] = useState([]);
  const loadCart = async () => {
    const response = await axios.get('/api/cart-items?expand=product')
    setCart(response.data);
  }
  useEffect(() => {
    loadCart();
  }, [])
  const totalQuantity = useMemo(() => {
    return cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(cart.map(item => item.quantity))]);
  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
        <Route path="checkout" element={<CheckoutPage cart={cart} totalQuantity={totalQuantity} loadCart= {loadCart}/>} />
        <Route path="orders" element={<OrdersPage cart={cart} />} />
        <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes >

    </>
  )
}

export default App
