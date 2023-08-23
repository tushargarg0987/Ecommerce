import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Header from './components/Header';
import Footer from './components/Footer';
import CategoryPage from './pages/CategoryPage';
import AdminPanel from './pages/AdminPanel';
import LoginPage from './components/Login';
import axios from 'axios';
import CartPage from './pages/Cart';
import Payment from './components/Payment';
import Completion from './components/Completion';

function App() {
  const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/productDetails').then((response) => {
      setData(response.data)
    })

  },[])

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} username={username} />
      <Routes>

        <Route path="/" element={<Home data={data} isLoggedIn={isLoggedIn} setUsername={setUsername} />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/cart" element={<CartPage username={username} data={data} />} />
        <Route path="/login" element={<LoginPage head={"Login"} setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
        <Route path="/products/:id" element={<ProductPage data={data} username={username} />} />
        <Route path="/category/:category" element={<CategoryPage data={data} />} />
        <Route path="/checkout/:amount" element={<Payment />} />
        <Route path="/completion/:amount" element={<Completion username={username} />} />
        

      </Routes>
      <Footer />

    </Router>
  );
}

export default App;
