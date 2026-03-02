import React from 'react'
import '../CartStyles/PaymentSuccess.css'

function PaymentSuccess() {
  return (
    <div className='payment-success-container'>
        <div className='success-icon'>
            <div className='checkmark'></div>
        </div>
        <h1>Order Confirmed</h1>
        <p>Your payment was successful. Thank you for your order! Reference ID <strong></strong></p>
    </div>
  )
}

export default PaymentSuccess