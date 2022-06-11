import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { FaCaretDown, FaBars } from 'react-icons/fa'
import Login from '../../Auth/Login';
import Register from '../../Auth/Register'
import './Navbar.scss';
import UserContext from '../../context/UserContext';
import domain from '../../util/domain';
import UserBox from './UserBox';


const Navbar = ({ setRegister, setLogin }) => {
  const [userNav, setUserNav] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  const { user, logOut } = useContext(UserContext);

  // Get username and favorite team
  const [username, setUsername] = useState('');
  const [favTeam, setFavTeam] = useState('');

  async function getUser() {
    if (user) {
      const userRes = await axios.get(`${domain}/loggedIn/${user}`);
      setUsername(userRes.data.username);
      setFavTeam(userRes.data.favoriteTeam);
    }
  }
  getUser();

  const register = () => {
    setRegister(true);
  }

  const login = () => {
    setLogin(true);
  }

  const closeNav = () => {
    setMobileNav(false)
  }

  return (
    <nav>
      <div className="logo">
        <Link to='/'><img src='../assets/logo.svg' alt='logo' />PickMaster</Link>
      </div>
      <div className="desktop-links">
        <ul>
          {user && (
            <Link to='/picks'>Make Picks</Link>
          )}
          <Link to='/pool'>View Pool</Link>
        </ul>
      </div>
      {/* navbar links for mobile view */}
      <p onClick={() => setMobileNav(!mobileNav)} className='mobile-user'>
        <FaBars />
      </p>
      <div className={mobileNav ? 'dropdown' : 'hide'}>
        <div className='mobile-links'>
          <ul>
            <Link exact to='/' className='link btn' onClick={closeNav}>
              Home
            </Link>
            <Link to='/picks' className='link btn' onClick={closeNav}>
              Your Picks
            </Link>
            <Link to='/pool' className='link btn' onClick={closeNav}>
              Vew Pool
            </Link>
            {/* <Link to='/games' className='link btn'>
        Games
    </Link> */}

            {user ? (
              <Link
                className='logout-btn btn'
                exact
                to='/picks'
                onClick={logOut}>
                Log out
              </Link>
            ) : (
              <>
                <p
                  className='link btn'
                  onClick={() => {
                    setRegister(true);
                    setMobileNav(false);
                  }}>
                  Register
                </p>
                <p
                  className='link btn last'
                  onClick={() => {
                    setLogin(true);
                    setMobileNav(false);
                  }}>
                  Login
                </p>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="controls">
        {user ? (
          <p onClick={() => setUserNav(!userNav)} className='desktop-user'>
            {username}
            <FaCaretDown className='down-arrow' />
          </p>
        ) : (
          <>
            <p
              className='register'
              onClick={register}>
              Register
            </p>
            <p
              className='login'
              onClick={login}>
              Login
            </p>
          </>
        )}
      </div>
      <div className={userNav ? 'user-sub-nav' : 'hide'}>
        <UserBox
          username={username}
          favTeam={favTeam}
          user={user}
          logOut={logOut}
        />
      </div>

    </nav >
  )
}

export default Navbar