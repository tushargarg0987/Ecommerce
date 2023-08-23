import React from 'react';
import { Link } from 'react-router-dom';

function Header({isLoggedIn,username}) {
    return (
        <header>
            <div style={{display: 'flex',alignContent: 'center',justifyContent: 'space-between',padding: 20}}>
                <Link to="/" style={{textDecoration: 'none',color: '#404040'}}><h2 style={{ fontFamily: 'cursive' }}>Universal Traders</h2></Link>
                <nav className='nav-elements'>
                    <Link to="/"  >Home</Link>
                    <Link to="/category/men"  >Men</Link>
                    <Link to="/category/women"  >Women</Link>
                    <Link to="/category/kids"  >Kids</Link>
                    {!isLoggedIn && <Link to='/login' style={{ display: 'flex', alignItems: 'center' }}><p style={{ color: 'white', backgroundColor: '#404040', margin: 0, padding: '3px 9px', borderRadius: 5 }}>Login</p></Link>}
                    {!isLoggedIn && <Link to='/admin' style={{ display: 'flex', alignItems: 'center' }}><p style={{ color: 'white', backgroundColor: '#404040', margin: 0, padding: '3px 9px', borderRadius: 5 }}>Admin</p></Link>}
                    {isLoggedIn && <Link to="/cart"  ><img style={{width: 30}} src='https://img.icons8.com/?size=512&id=85093&format=png' /></Link>}
                    {isLoggedIn && <h5 style={{margin: '0 5px'}}>{ username}</h5>}
                </nav>
            </div>
        </header>
    );
}

export default Header;
