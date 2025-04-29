import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { BiCart, BiUser } from "react-icons/bi";
import { FaCentos } from "react-icons/fa";
import './Navbar.css'
import { ShopContext } from '../../context/ShopContext';


const Navbar = () => {
    const [loading, setLoading] = useState(false);
    const {updateSearchTerm, getCartCount, token, setToken} = useContext(ShopContext);

    const logout = () => {
        navigate("/login");
        localStorage.removeItem("token");
        setToken("");
    }

    const navigate = useNavigate();
    const handleNavigation = (path) => {
        setLoading(true);
        setTimeout(()=>{
            setLoading(false)
        },2000);
        navigate(path);
    }

    const [searchInput, setSearchInput] = useState('');
    
    const handleSearch = () => {
        updateSearchTerm(searchInput);
    }
  return (
    <div>
        {
            loading && (
                <div className="loader-container">
                    <div className="loader"><FaCentos className='loader-icon'/> </div>
                </div>
            )
        }
        <nav className="navbar">
            <div className="nav-top">
                <Link to="/">
                  <h2 className="">StyleWave</h2>
                </Link>
                <div className="search-bar">
                    <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search for products....." className='search-input' />
                    <button onClick={handleSearch} className="search-btn">Search</button>
                </div>
                <div className="icons">
                    <div className="profile-group">
                        <BiUser className='icon' />
                        <div className="dropdown-menu">
                            <Link to="/login">
                                <p className="dropdown-item">Account</p>
                            </Link>
                            <p onClick={logout} className="dropdown-item">Logout</p>
                        </div>
                    </div>
                    <div className="cart-icon" onClick={()=>handleNavigation("/cart")}>
                            <BiCart className='icon' />
                            <span className="cart-count">{getCartCount()}</span>
                    </div>
                </div>
            </div>
            <div className="nav-bottom">
                <div className="nav-container">
                    <div onClick={()=>handleNavigation("/category/Men")} className="navbar-link">Men</div>
                    <div onClick={()=>handleNavigation("/category/Women")} className="navbar-link">Women</div>
                    <div onClick={()=>handleNavigation("/category/Kids")} className="navbar-link">Kids</div>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar;