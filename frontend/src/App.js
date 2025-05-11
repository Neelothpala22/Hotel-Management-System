import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import AllCustomers from "./components/AllCustomers";
import AddCustomer from "./components/AddCustomer";
import CustomerProfile from "./components/CustomerProfile";
import CheckOutPage from "./components/CheckOutPage";
import CheckOutProfile from "./components/CheckOutProfile"; 
import AddRoom from "./components/AddRoom";
import RoomList from "./components/RoomList";
import Login from "./components/login";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<AllCustomers />} />
          <Route path="/add" element={<AddCustomer />} />
          <Route path="/customer/:id" element={<CustomerProfile />} />
          <Route path="/checkout" element={<CheckOutPage />} />
          <Route path="/checkout/:id" element={<CheckOutProfile />} /> 
          <Route path="/rooms/add" element={<AddRoom />} />
          <Route path="/rooms" element={<RoomList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
