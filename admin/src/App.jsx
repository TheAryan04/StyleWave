import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add/Add.jsx";
import List from "./pages/List/List.jsx";
import Orders from "./pages/Orders/Orders.jsx";
import Login from "./components/Login/Login.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = 'https://backend-stylewave.vercel.app';
export const currency = '$'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(()=> {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div className="app-container">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken}/>
      ) : (
        <>
          <div className="app-content">
            <Sidebar setToken={setToken}/>
            <div className="page-content">
              <Routes>
                <Route path="/add" element={<Add token={token}/>} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} /> 
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
