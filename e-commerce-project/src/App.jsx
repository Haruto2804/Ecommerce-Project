
import { Routes, Route } from 'react-router'
import { useState, useEffect, useMemo } from 'react'
import axios from 'axios';
import { HomePage } from './pages/home/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPages'
import { OrdersPage } from './pages/orders/OrdersPage'
import { TrackingPage } from './pages/tracking/TrackingPage'
import { NotFoundPage } from './pages/notfoundpage/NotFoundPage'
import './App.css'
// This makes axios available in the Console.
// - Then, you can try running axios.post('/api/reset') in the Console.
window.axios = axios;

// More details:
// - Normally, we can't access values (like axios) outside of a file.
// - However, JavaScript has a built-in, global object called window
//   (this represents the browser window).
// - So one way to make a value accessible anywhere (including in the
//   Console), is to attach it to the window object. That's why we
//   do window.axios = axios;
// - Now, in the Console, we can run window.axios.post(...)
// - And JavaScript has another shortcut we can use. If we just type
//   "axios", this is a shortcut for "window.axios"
// - That's why the code window.axios = axios; lets us use "axios"
//   anywhere (including in the Conosle).





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
        <Route path="orders" element={<OrdersPage cart={cart} loadCart = {loadCart} />} />
        <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes >

    </>
  )
}

export default App
