import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Services from "./pages/Services";
import Navbar from "./components/Navbar";

function App() {
  return(
    <BrowserRouter>

    <Navbar />
      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/services" element={<Services/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
