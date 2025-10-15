import './OrdersPage.css'
import { Header } from '../components/Header'
import axios from 'axios';
import dayjs from 'dayjs'
import { formatMoney } from '../utils/money';
import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router'
import BuyAgainIcon from '../assets/images/icons/buy-again.png';
import { Fragment } from 'react';
export function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get('/api/orders?expand=products')
      .then((response) => {
        setOrders(response.data);

      })

  }, [])
  return (
    <>

      <title>Orders</title>
      <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />

      <Header cart={cart} />
      <body>
        <div className="header">
          <div className="left-section">
            <Link to="/" className="header-link">
              <img className="logo"
                src="images/logo-white.png" />
              <img className="mobile-logo"
                src="images/mobile-logo-white.png" />
            </Link>
          </div>

          <div className="middle-section">
            <input className="search-bar" type="text" placeholder="Search" />

            <button className="search-button">
              <img className="search-icon" src="images/icons/search-icon.png" />
            </button>
          </div>

          <div className="right-section">
            <NavLink className="orders-link header-link" href="/order">

              <span className="orders-text">Orders</span>
            </NavLink>

            <Link to="cart-link header-link" href="/checkout">
              <img className="cart-icon" src="images/icons/cart-icon.png" />
              <div className="cart-quantity">3</div>
              <div className="cart-text">Cart</div>
            </Link>
          </div>
        </div>

        <div className="orders-page">
          <div className="page-title">Your Orders</div>

          <div className="orders-grid">

            {orders.length > 0 && orders.map((order) => {
              return (
                <>
                  <div key={order.id} className="order-container">

                    <div className="order-header">
                      <div className="order-header-left-section">
                        <div className="order-date">
                          <div className="order-header-label">Order Placed:</div>
                          <div>{dayjs(order.orderTimeMs).format('MMMM D')}</div>
                        </div>
                        <div className="order-total">
                          <div className="order-header-label">Total:</div>
                          <div>${formatMoney(order.totalCostCents)}</div>
                        </div>
                      </div>

                      <div className="order-header-right-section">
                        <div className="order-header-label">Order ID:</div>
                        <div>{order.id}</div>
                      </div>
                    </div>

                    <div className="order-details-grid">
                      {order.products && order.products.map((orderProduct) => {
                        return (
                          <Fragment key={orderProduct.product.id}>
                            <div className="product-image-container">
                              <img src={orderProduct.product.image} />
                            </div>

                            <div className="product-details">
                              <div className="product-name">
                                {orderProduct.product.name}
                              </div>
                              <div className="product-delivery-date">
                                Arriving on: {dayjs(orderProduct
                                  .estimatedDeliveryTimeMs).format('MMMM D')};
                              </div>
                              <div className="product-quantity">
                                Quantity: {orderProduct.quantity}
                              </div>
                              <button className="buy-again-button button-primary">
                                <img className="buy-again-icon" src={BuyAgainIcon} />
                                <span className="buy-again-message">Add to Cart</span>
                              </button>
                            </div>

                            <div className="product-actions">
                              <Link to="/tracking">
                                <button className="track-package-button button-secondary">
                                  Track package
                                </button>
                              </Link>
                            </div>
                          </Fragment>

                        )

                      })}

                    </div>
                  </div>
                </>
              )
            })}

          </div>
        </div>
      </body>
    </>
  )
}