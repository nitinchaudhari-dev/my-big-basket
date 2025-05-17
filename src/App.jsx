import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Veg from "./Veg";
import Nonveg from "./Nonveg";
import Cart from "./Cart";
import Orders from "./Orders";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import { useDispatch, useSelector } from "react-redux";
import Home from "./Home";
import PageNotFound from "./PageNotFound";
import './App.css';
import Chocolate from "./Chocolate";
import SignIn from "./Signin";
import SignUp from "./SignUp";
import { logout } from "./store";


function App() {
  let cartItems=useSelector((state)=>state.cart)
  let totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const isAuthenticated= useSelector((State)=>State.users.isAuthenticated);
  const currentUsers=useSelector((State)=>State.users.currentUsers);
  const dispatch= useDispatch();
  return (
    <BrowserRouter>
  <div className="navbar">
  <Link to="/Home" className="veg-link"> 🏠Home</Link>
  <Link to="/Veg" className="veg-link"> 🥦Veg Items</Link>
  <Link to="/Nonveg" className="nonveg-link">🍗Non Veg Items</Link>
  <Link to="/Chocolate" className="chocolate"> 🍫Chocolates</Link>
  <Link to="/Cart" className="cart-link">🛒Cart({totalCartCount})</Link>
  <Link to="/Orders" className="Order">Orders</Link>
  <Link to="/AboutUs" className="aboutus-link">About Us</Link>
  <Link to="/ContactUs" className="contactus-link">📞Contact Us</Link>
  {
    isAuthenticated?<><button onClick={()=>dispatch(logout())}>logout</button></>:<Link to="/Signin" className="Signin"> Sign in</Link>
  }
  
 

</div>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Veg" element={<Veg />} />
        <Route path="/Nonveg" element={<Nonveg />} />
        <Route path="/Chocolate" element={<Chocolate/>}/>
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Orders" element={<Orders/>}></Route>
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/Signin" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;