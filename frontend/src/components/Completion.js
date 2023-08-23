import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Completion({ username }) {
  const { amount } = useParams();
  useEffect(() => {
    axios.post('/addPayment', {
      username: username,
      amount: amount
    })
  },[])
  return (
    <div style={{display: 'flex',flexDirection: 'column',width: '100vw',height: '90vh',justifyContent: 'center',alignItems: 'center',position: 'absolute',left: 0}} align='center'>
      <h1>Thank you for shopping with Universal Traders</h1>
      <h1>Hope to see you soon 😁</h1>
    </div>
  );
}

export default Completion;
