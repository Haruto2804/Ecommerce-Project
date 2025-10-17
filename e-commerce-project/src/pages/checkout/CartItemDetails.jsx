import { formatMoney } from "../../utils/money"
import axios from "axios"
import { useState } from "react"
export function CartItemDetails({ cartItem, loadCart }) {
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const updateCartItem = async () => {
    await axios.put(`/api/cart-items/${cartItem.productId}`, {
      quantity: Number(quantity)
    });
    await loadCart();
  }
  const updateQuantity = () => {
    // Switch between true and false for isUpdatingQuantity.
    if (isUpdatingQuantity) {
      updateCartItem();
      setIsUpdatingQuantity(false);
    } else {
      setIsUpdatingQuantity(true);
    }
  };

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`)
    await loadCart();
  }
  const handleKeyDown = (event)=> {
    if(event.key === 'Enter') {
      updateCartItem();
    }
    else if(event.key === 'Escape') {
      setIsUpdatingQuantity(false);
    }
  }
  return (
    <>
      <img className="product-image"
        src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">
          {cartItem.product.name}
        </div>
        <div className="product-price">
          ${formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            <span className="quantity-label"></span>
            Quantity: {isUpdatingQuantity
              ? <input type="text" className="quantity-textbox"
                value={quantity} onChange={((e) => {
                  setQuantity(e.target.value);
                  console.log(e.target.value)
                })}
                onKeyDown={handleKeyDown}


              />
              : <span className="quantity-label">{cartItem.quantity}</span>
            }
          </span>
          <span className="update-quantity-link link-primary"
            onClick={updateQuantity}
          >
            {isUpdatingQuantity ? 'Save' : 'Update'}
          </span>
          <span className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>

  )
}