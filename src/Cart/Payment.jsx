import React from 'react'
import "../CartStyles/Payment.css";
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CheckoutPath from './CheckoutPath';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import PaymentForm from './PaymentForm';


function Payment() {
    //const orderItem = JSON.parse(sessionStorage.getItem("orderItem"));
  
  return (
    <>
    <PageTitle title="Payment Processing"/>
    <Navbar />
    <CheckoutPath activePath={2} />
    <div className='payment-container'>
        <Link to="/order/confirm" className='payment-go-back'>Go Back</Link>
        { /*<button className="payment-btn">Pay ({orderItem.total})</button> */}
         <PaymentForm /> {/* Embed the full payment form */}
    </div>
    <Footer />
    </>
  )
}

export default Payment