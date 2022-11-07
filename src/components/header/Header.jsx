import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png'
import './header.css';
import { HashLink as Link } from 'react-router-hash-link';
import { AiOutlineUser } from 'react-icons/ai';
import { BsCart } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiMenu } from 'react-icons/bi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { MdFavoriteBorder } from 'react-icons/md';
import { MdFavorite } from 'react-icons/md'

const Header = (props) => {
    const { isSearchBar, action, actionEnter, cartList } = props;
    const [toggle, showNav] = useState(false);

    const amountCart = cartList.reduce((total, cartItem) => total +=  cartItem.quantityCart, 0)

  return (
    <div className={toggle ? 'header show_header' : 'header'}>
        <Link to="/">
        <div className='logo'>
            <img src={logo} alt="logo" />
        </div>
        </Link>
        { isSearchBar === 'false' ? 
        <div className={toggle ? 'nav show_nav' : 'nav'}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/shop">Shop</NavLink>
            <a className="nav_contact" href='/#contact'>Contact</a>

        </div>
        : <>
        <div className={toggle ? 'nav2 show_nav2' : 'nav2'}>
            <a href="/">Home</a>
            <a href="/shop">Shop</a>
            <Link to="/#contact">Contact</Link>
        </div>
        <div className='searchBar'>
            <AiOutlineSearch/>
            <input type="text" placeholder="Search" onChange={action} onKeyDown={actionEnter}/>
        </div>      
        </> }
        <div className='header_icon'>
            <NavLink to="/favorites" className='icon favorite' activeclassname="active">
                <p><MdFavoriteBorder/></p>
            </NavLink>
            <NavLink to="/cart" className='icon cart' activeclassname='active'>
                <p><BsCart/></p>
                {amountCart < 1 
                    ? <></>
                    : <>
                        {amountCart > 99
                            ? <span className='badge_cart plus'>99+</span>
                            : <span className='badge_cart'>{amountCart}</span>
                        }
                      </>
                }
            </NavLink>
            <div className='icon' id='menu' onClick={() => showNav(!toggle)}>
            {toggle ?
                <a><AiOutlineCloseCircle /></a> :
                <a><BiMenu /></a>
            }
            </div>
        </div>
        {/* <div className="header_icon close" onClick={() => showNav(!toggle)}>
            <div className='icon'>
                <a><AiOutlineCloseCircle /></a>
            </div>
        </div> */}
    </div>
  )
}

export default Header