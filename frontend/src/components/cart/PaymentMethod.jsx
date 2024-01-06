import React, { useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps';
import { useSelector } from 'react-redux';
import { calculateOrderCost } from '../../helpers/helpers';
import { useCreateNewOrderMutation } from '../../redux/api/orderApi';
import {toast} from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const PaymentMethod = () => {

    const [method, setMethod] = useState("");

    const navigate = useNavigate();
    
    const {shippingInfo, cartItems} = useSelector((state) => state.cart);
    
    const [createNewOrder, {isLoading, error, isSuccess}] = useCreateNewOrderMutation();

    useEffect(() => {
        if (error) {
            toast.error(error?.data.message)
        }

        if (isSuccess) {
            navigate("/me/orders?order_success=true");
        }

    }, [error, isSuccess]);

    const submitHandler = (e) => {
        e.preventDefault();

        const {itemsPrice, shippingPrice, totalPrice} = calculateOrderCost(cartItems);

        if (method === "COD") {
            // Create COD Order
            const orderData = {
                shippingInfo,
                orderItems: cartItems,
                itemsPrice, 
                shippingAmount: shippingPrice,
                totalAmount: totalPrice,
                paymentInfo: {
                    status: "Not Paid"
                },
                paymentMethod: "COD",
            };

            createNewOrder(orderData);
        }  
    }
 
  return (
    <>
    <MetaData title={"Payment Method"} />
    <CheckoutSteps shipping confirmOrder payment/>


    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
          onSubmit={submitHandler}
        >
          <h2 className="mb-4">Select Payment Method</h2>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="payment_mode"
              id="codradio"
              value="COD"
              onChange={(e) => setMethod("COD")}
            />
            <label className="form-check-label" htmlFor="codradio">
              Cash on Delivery
            </label>
          </div>

          <button id="shipping_btn" type="submit" className="btn py-2 w-100">
            CONTINUE
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default PaymentMethod