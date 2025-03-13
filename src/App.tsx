// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
// import NavBar from './components/NavBar'
import MainLayout from "./Layout/MainLayout";
import Home from "./pages/Home";
import { Product } from "./pages/ProductInfo";
import { CartProvider } from "./context/CartContext";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Proudcts from "./pages/Products";
import { FilterProvider } from "./context/FilterContext";

function App() {
  return (
    <>
      <FilterProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Proudcts />} />
            <Route path="/*" element={<Home />} />
          </Routes>
        </CartProvider>
      </FilterProvider>
    </>
  );
}

export default App;
