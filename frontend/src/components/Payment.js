import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";

function Payment() {
  const { amount } = useParams();
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [newAmount, setNewAmount] = useState();

  useEffect(() => {
    console.log(amount);
    fetch("/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
      setAmountHandler();
    });
    setNewAmount(amount)
    
  }, []);

  function setAmountHandler() {
    fetch("/create-payment-intent", {
      method: "POST",
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
    },
      body: JSON.stringify({amount: amount}),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }

  return (
    <div align="center" style={{padding: '20px 40px'}}>
      <div align='center'>
        <h1>Universal Traders</h1>
      </div>
      <div style={{maxWidth: '800px'}} align="right">
        <h2>Amount : ₹ { amount }</h2>
      </div>
      <div style={{maxWidth: '800px'}}>
        {clientSecret && stripePromise && (
          <Elements stripe={stripePromise} options={{ clientSecret }} >
            <CheckoutForm amount={amount} />
          </Elements>
        )}
      </div>
    </div>
  );
}

export default Payment;
