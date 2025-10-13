
import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage'
import {CheckoutPage} from './pages/CheckoutPages'
import { OrdersPage } from './pages/OrdersPage'
import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="order" element={<OrdersPage />} />
                
    </Routes >
    
    </>
  )
}

export default App
