import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Users } from "./pages";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StoreProvider } from "./components";

function App() {
  return (
    <>
      <BrowserRouter>
        <StoreProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </StoreProvider>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
