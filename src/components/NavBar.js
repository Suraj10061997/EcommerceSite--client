import {useState} from 'react';
import {Link} from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
    let [active,setActive] = useState(1);
    const handleClick = (value) =>{
        active=value;
        setActive(value);
    }
  return (
    <div className='navbar-container'>
        <div className='title'><div style={{fontWeight:"bolder"}}>Big Bazaar</div></div>
        <nav>
            <ul>
               <Link to="/" className="link" style={{color:`${active === 1 ?"black":"white"}`}} onClick={()=>handleClick(1)} >Home</Link>
               <Link to="/cartPage" className="link" style={{color:`${active === 2 ?"black":"white"}`}} onClick={()=>handleClick(2)} >Cart</Link>
               <Link to="/historyPage" className="link" style={{color:`${active === 3 ?"black":"white"}`}} onClick={()=>handleClick(3)}>History</Link>
            </ul>
        </nav>
    </div>
  )
}

export default NavBar