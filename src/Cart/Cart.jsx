import React from 'react'
import '../CartStyles/Cart.css'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Cart() {
  return (
    <>
        <PageTitle title="Your Cart" />
        <Navbar />
            <div className='cart-page'>
                <div className="cart-items">
                    <div className="cart-items-heading">Your Cart</div>
                    <div className="cart-table">
                        <div className='cart-table-header'>
                            <div className="header-product">Product</div>
                            <div className="header-quantity">Quantity</div>
                            <div className="header-quantity">Yard</div>
                            <div className="header-total item-total-heading">Item Total</div>
                            <div className='header-action item-total-heading'>Actions</div>
                        </div>
                    </div>
                </div>
            </div>

        <Footer />
    </>
  )
}

export default Cart