import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  addItemsToCart,
  removeErrors,
  removeMessage,
  removeItemFromCart
} from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

function CartItem({ item }) {
  const { success, error, loading, message, cartItems } = useSelector(
    (state) => state.cart,
  );
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity);
  const [yard, setYard] = useState(item.yard);
 
  const decreaseQuantity = () => {
    if (quantity <= 1) {
      toast.error("Quantity cannot be less than 1", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeErrors());
      return;
    }
    setQuantity((qty) => qty - 1);
  };

  const increaseQuantity = () => {
    if (item.stock <= quantity) {
      toast.error("Cannot exceed available stock", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeErrors());
      return;
    }
    setQuantity((qty) => qty + 1);
  };

  const decreaseYard = () => {
    if (yard <= 1) {
      toast.error("Yard cannot be less than 1", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeErrors());
      return;
    }

    setYard((yd) => yd - 1);
  };

  const increaseYard = () => {
    if (yard >= 10) {
      toast.error("Yard cannot exceed 10", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeErrors());
      return;
    }
    setYard((yd) => yd + 1);
  };

  const handleUpdate = () => {
    if (loading) return;
    if (quantity !== item.quantity || yard !== item.yard) {
      dispatch(addItemsToCart({ id: item.product, quantity, yard }));
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success(message, {
        position: "top-center",
        autoClose: 3000,
        toastId: "cart-update",
      });
      dispatch(removeMessage());
    }
  }, [dispatch, success, message]);

  const handleRemove = () => {
    if (loading) return;
    dispatch(removeItemFromCart(item.product));
    toast.success("Item removed from cart", {
      position: "top-center",
      autoClose: 3000,
    });
  };
  return (
    <div className="cart-item">
      <div className="item-info">
        <img src={item.image} alt={item.name} className="item-image" />
        <div className="item-details">
          <h3 className="item-name">{item.name}</h3>
          <p className="item-price">
            <strong>Price:</strong> #{item.price.toFixed(2)}
          </p>
          <p className="item-quanity">
            <strong>Quantity: </strong>
            {item.quantity}
          </p>
          <p className="item-quanity">
            <strong>Yard: </strong>
            {item.yard}
          </p>
        </div>
      </div>

      <div className="quantity-controls">
        <button
          className="quantity-button decrease-btn"
          onClick={decreaseQuantity}
          disabled={loading}
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          className="quantity-input"
          readOnly
          min="1"
        />
        <button
          className="quantity-button increase-btn"
          onClick={increaseQuantity}
          disabled={loading}
        >
          +
        </button>
      </div>

      <div className="quantity-controls">
        <button
          className="quantity-button decrease-btn"
          onClick={decreaseYard}
          disabled={loading}
        >
          -
        </button>
        <input type="number" value={yard} className="quantity-input" readOnly />
        <button
          className="quantity-button increase-btn"
          onClick={increaseYard}
          disabled={loading}
        >
          +
        </button>
      </div>

      <div className="item-total">
        <span className="item-total-price">
          {(item.price * item.quantity * item.yard).toFixed(2)}
        </span>
      </div>

      <div className="item-actions">
        <button
          className="update-item-btn"
          onClick={handleUpdate}
          disabled={
            loading || (quantity === item.quantity && yard === item.yard)
          }
        >
          {loading ? "Updating..." : "Update"}
        </button>
        <button
          className="remove-item-btn"
          disabled={loading}
          onClick={handleRemove}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
