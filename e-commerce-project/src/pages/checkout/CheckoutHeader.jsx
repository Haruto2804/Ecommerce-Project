import CheckoutLockIcon from '../../assets/images/icons/checkout-lock-icon.png';
import { Link } from 'react-router-dom'
import {useMemo } from 'react';
import Logo from '../../assets/images/logo.png';
import MobileLogo from '../../assets/images/mobile-logo.png';
export function CheckoutHeader({ cart }) {
  const totalQuantity = useMemo(() => {
    let total = 0;
    console.log('Dang tinh toan lai so luong')
    cart.forEach((cartItem) => {
      total += cartItem.quantity;
    });
    return total;
  },[cart])
  return (
    <div className="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
          <Link to="/">
            <img className="logo" src={Logo} />
            <img className="mobile-logo" src={MobileLogo} />
          </Link>
        </div>

        <div className="checkout-header-middle-section">
          Checkout (<Link className="return-to-home-link"
            to="/">{totalQuantity} items</Link>)
        </div>

        <div className="checkout-header-right-section">
          <img src={CheckoutLockIcon} />
        </div>
      </div>
    </div>
  )
}