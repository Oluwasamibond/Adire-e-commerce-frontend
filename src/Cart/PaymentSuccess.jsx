import React, { useEffect, useState } from "react";
import "../CartStyles/PaymentSuccess.css";
import { Link, useSearchParams } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import Loader from "../components/Loader";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const referenceId = searchParams.get("reference");
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyPayment = async () => {
      if (!referenceId) return;

      try {
        const { data } = await axios.get(
          `/api/payment/paystack/verify?reference=${referenceId}`,
          { withCredentials: true }
        );

        if (data.success) {
          setOrder(data.order);
          toast.success("Order Confirmed!", {
            position: "top-center",
            autoClose: 3000,
          });
          // Clear cart and shipping info after successful order
          dispatch(clearCart())
        }
      } catch (error) {
        console.error("Verification error:", error.response?.data || error);
        toast.error(
          error.response?.data?.message || "Payment verification failed",
          { position: "top-center", autoClose: 4000 }
        );
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [referenceId]);

  return (
    <>
      <PageTitle title="Payment Success" />
      <Navbar />
      <div className="payment-success-container">
        <div className="success-content">
          <div className="success-icon">
            <div className="checkmark"></div>
          </div>

          {loading ? (
           <div>
            <Loader />
              <h1>Verifying Payment...</h1>
           </div>
          ) : order ? (
            <>
              <h1>Order Confirmed</h1>
              <p>
                Your payment was successful. Reference ID{" "}
                <strong>{referenceId}</strong>
              </p>
              <p>Total: ₦{order.totalPrice.toLocaleString()}</p>
              <Link to="/orders/user" className="explore-btn">
                View Orders
              </Link>
            </>
          ) : (
            <h1>Payment verification failed.</h1>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PaymentSuccess;