import React, { useEffect } from "react";
import "../OrderStyles/OrderDetails.css";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, removeErrors } from "../features/order/orderSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

function OrderDetails() {
  const { id } = useParams();
  const { order, loading, error } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderDetails(id));
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error, id]);
  const {
    shippingInfo = {},
    orderItems = [],
    paymentInfo = {},
    orderStatus,
    totalPrice,
    taxPrice,
    shippingPrice,
    itemsPrice,
    paidAt,
  } = order;
  const paymentStatus = paymentInfo?.status === "success" ? "PAID" : "NOT PAID";
  const finalOrderStatus = paymentStatus === "NOT PAID" ? "Cancelled" : orderStatus;
  const orderStatusClass = finalOrderStatus === "Delivered" ? "status-tag delivered" : `status-tag ${finalOrderStatus.toLowerCase()}`;
  const paymentStatusClass = `pay-tag ${paymentStatus === 'Paid' ? 'paid' : 'not-paid'}`;
  

  return (
    <>
      <PageTitle title={id} />
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="order-box">
          {/* Order items table */}
          <div className="table-block">
            <h2 className="table-title">Order Items</h2>
            <table className="table-main">
              <thead>
                <tr>
                  <th className="head-cell">Image</th>
                  <th className="head-cell">Name</th>
                  <th className="head-cell">Quantity</th>
                  <th className="head-cell">Yard</th>
                  <th className="head-cell">Price</th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map((item) => (
                  <tr className="table-row">
                    <td className="table-cel">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="item-img"
                      />
                    </td>
                    <td className="table-cel">{item.name}</td>
                    <td className="table-cel">{item.quantity}</td>
                    <td className="table-cel">{item.yard}</td>
                    <td className="table-cel">
                      ₦{item.price.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Shipping Information Table */}
          <div className="table-block">
            <h2 className="table-title">Shipping Information</h2>
            <table className="table-main">
              <tbody>
                <tr className="table-row">
                  <th className="table-cell">Address</th>
                  <td className="table-cell">
                     {shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.country}, ${shippingInfo.zipCode}`}
                  </td>
                </tr>
                <tr className="table-row">
                  <th className="table-cell">Phone Number</th>
                  <td className="table-cell">{shippingInfo.phoneNo}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Order Summary Table */}
          <div className="table-block">
            <h2 className="table-title">Order Summary</h2>
            <table className="table-main">
              <tbody>
                <tr className="table-row">
                  <th className="table-cell">Order Status</th>
                  <td className="table-cell">
                    <span className="status-tag processing">{finalOrderStatus}</span>
                  </td>
                </tr>
                <tr className="table-row">
                  <th className="table-cell">Payment</th>
                  <td className="table-cell">
                    <span className="pay-tag paid">{paymentStatus}</span>
                  </td>
                </tr>
               { paidAt && ( <tr className="table-row">
                  <th className="table-cell">Paid At</th>
                  <td className="table-cell">{new Date(paidAt).toLocaleDateString()}</td>
                </tr>)}
                <tr className="table-row">
                  <th className="table-cell">Items Price</th>
                  <td className="table-cell">{itemsPrice}</td>
                </tr>
                <tr className="table-row">
                  <th className="table-cell">Tax Price</th>
                  <td className="table-cell">{taxPrice}</td>
                </tr>
                <tr className="table-row">
                  <th className="table-cell">Shipping Price</th>
                  <td className="table-cell">{shippingPrice}</td>
                </tr>
                <tr className="table-row">
                  <th className="table-cell">Total Price</th>
                  <td className="table-cell">{totalPrice}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default OrderDetails;
