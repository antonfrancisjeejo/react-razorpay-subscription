import React, { useState } from "react";
import axios from "./axios";

const Payment = ({ planId }) => {
  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/order/${planId}`);
      const { data } = await response;
      console.log(data);
      const options = {
        key: "rzp_test_9wyNxxRq89nybZ",
        name: "Techieegy",
        description: `Standard Plan`,
        subscription_id: data.id,
        handler: async (response) => {
          console.log(response);
          try {
            const config = {
              headers: {
                ContentType: "application/json",
              },
            };
            const temp = {
              paymentDetails: {
                payment: "no",
                subscription_id: data.id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
            };
            const res = await axios.post("/api/verify", temp, config);
            console.log(res.data);
            if (
              typeof response.razorpay_payment_id == "undefined" ||
              response.razorpay_payment_id < 1
            ) {
              console.log("Success");
            } else {
              console.log("Failed");
            }
            console.log("Success");
          } catch (err) {
            console.log("Failed");
          }
        },
        theme: {
          color: "#528FF0",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <button className="subscribe__button" onClick={paymentHandler}>
        Subscribe Now
      </button>
    </div>
  );
};

export default Payment;
