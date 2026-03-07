import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Services from "./pages/Services";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import MyBookings from "./pages/MyBookings";
import ProviderDashboard from "./pages/ProviderDashboard";

function App() {
  return(
    <BrowserRouter>

    <Navbar />

      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/services" element={<Services/>}/>
        <Route path="/" element={<Home />}></Route>
        <Route path="/my-bookings" element={<MyBookings/>} />
        <Route path="/provider-dashboard" element={<ProviderDashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
