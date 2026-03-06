import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../CartStyles/Payment.css";

const PaymentForm = () => {
  const { user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

   const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo"));

  const [shippingMethod, setShippingMethod] = useState(null);
  const [loading, setLoading] = useState(false);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity * item.yard,
    0,
  );
  const tax = subtotal * 0.075;

  const shippingOptions = [
    { id: 1, name: "Lagos Mainland", price: 4000 },
    { id: 2, name: "Lagos Island", price: 4500 },
    { id: 3, name: "South West", price: 5500 },
    { id: 4, name: "South East", price: 6000 },
    { id: 5, name: "North Central", price: 7000 },
    { id: 6, name: "North East", price: 7500 },
  ];

  const total = subtotal + tax + (shippingMethod?.price || 0);

  const handlePaystackPayment = async () => {
    if (!shippingMethod) {
      toast.error("Please select a shipping method", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    setLoading(true);

    try {
      // Build payload
      const orderPayload = {
        orderItems: cartItems.map((item) => ({
          product: item.product,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          yard: item.yard,
          image: item.image || "default.png",
        })),
        shippingInfo: {
          address: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          country: shippingInfo.country,
          zipCode: shippingInfo.zipCode,
          phoneNo: shippingInfo.phoneNo,
        },
        itemsPrice: subtotal,
        taxPrice: tax,
        shippingPrice: shippingMethod.price,
        totalPrice: total,
        userEmail: user.email,
        userName: user.name,
      };

      const { data } = await axios.post(
        "http://localhost:8000/api/payment/paystack/initialize",
        orderPayload,
        { withCredentials: true },
      );

      if (data.success && data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        toast.error("Payment initialization failed", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Payment error:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Payment failed", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h2>Shipping Method</h2>

      {shippingOptions.map((option) => (
        <label
          key={option.id}
          className={`shipping-option ${
            shippingMethod?.id === option.id ? "selected" : ""
          }`}
        >
          <input
            type="radio"
            name="shipping"
            value={option.id}
            onChange={() => setShippingMethod(option)}
          />
          {option.name} - ₦{option.price.toLocaleString()}
        </label>
      ))}

      <h3>Total: ₦{total.toLocaleString()}</h3>

      <button
        className="payment-btn"
        onClick={handlePaystackPayment}
        disabled={loading}
      >
        {loading ? "Processing..." : `Pay ₦${total.toLocaleString()}`}
      </button>
    </div>
  );
};

export default PaymentForm;
