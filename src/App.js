import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';

import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Cart from "./pages/Cart";

function App() {
  return (
    <Router>
      <NavBar/>
      <ToastContainer/>
      <div className="App">
        <Routes>
          <Route path="/" exact  element={<Home></Home>}/>
          <Route path="/cartPage" exact  element={<Cart></Cart>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
