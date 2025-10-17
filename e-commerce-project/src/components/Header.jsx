import { Link, NavLink } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom';
import './Header.css'
import CartIcon from '../assets/images/icons/cart-icon.png';
import SearchIcon from '../assets/images/icons/search-icon.png';
import LogoWhite from '../assets/images/logo-white.png';
import MobileLogoWhite from '../assets/images/mobile-logo-white.png';

export function Header({ cart }) {
  // ✅ Lấy search params từ URL
  const [searchParams, setSearchParams] = useSearchParams();
  const searchText = searchParams.get('search') || ''; // Lấy giá trị search từ URL
  
  // ✅ Hàm cập nhật search input
  const updateSearchInput = (event) => {
    const newSearchValue = event.target.value;
    
    // Cập nhật URL với search value mới
    if (newSearchValue) {
      setSearchParams({ search: newSearchValue });
    } else {
      // Nếu search rỗng, xóa param khỏi URL
      setSearchParams({});
    }
  }


  // Tính tổng số lượng items trong cart
  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  })

  return (
    <>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-link">
            <img className="logo" src={LogoWhite} alt="Logo" />
            <img className="mobile-logo" src={MobileLogoWhite} alt="Mobile Logo" />
          </NavLink>
        </div>

        <div className="middle-section">
          <input 
            value={searchText} 
            className="search-bar" 
            type="text" 
            placeholder="Search"
            onChange={updateSearchInput}  // ✅ Đổi từ onClick sang onChange
          />
          <button className="search-button">
            <img className="search-icon" src={SearchIcon} alt="Search" />
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </NavLink>
          <Link className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src={CartIcon} alt="Cart" />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </Link>
        </div>
      </div>
    </>
  )
}