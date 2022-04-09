import React, { useState, useEffect } from 'react';
import { Drawer, Avatar } from 'antd';
import Head from 'next/head';
import Link from 'next/link';
import Login from '../pages/login';
import Register from '../pages/register';
import Router from 'next/router';
import {
  isAuthenticated,
  removeCookie,
  removeLocalStorage,
} from '../helpers/localStorage';
import { useDispatch, useSelector } from 'react-redux';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const [viewMenu, setViewMenu] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const userInfo = useSelector((state) => state.UrlShortenerUser);

  const loginHandler = () => {
    setLoginVisible(true);
    setRegisterVisible(false);
    setViewMenu(false);
  };

  const registerHandler = () => {
    setRegisterVisible(true);
    setLoginVisible(false);
    setViewMenu(false);
  };

  const showDrawer = () => {
    setViewMenu(true);
  };

  const onClose = () => {
    setViewMenu(false);
  };

  useEffect(() => {
    if (isAuthenticated()) {
      setUserDetails(isAuthenticated());
    }
    if (!isAuthenticated()) {
      setUserDetails(undefined);
    }
  }, [userInfo]);

  const handleUrls = () => {
    Router.push('/user/urls');
    setViewMenu(false);
  };
  const handleProfile = () => {
    Router.push('/user/settings');
    setViewMenu(false);
  };

  const logout = () => {
    removeCookie('token');
    removeLocalStorage('urlshortener');
    setViewMenu(false);
    Router.push('/');
    dispatch({
      type: 'LOGOUT',
    });
  };

  const head = () => (
    <>
      <link
        rel='stylesheet'
        href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
        integrity='sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg=='
        crossOrigin='anonymous'
        referrerPolicy='no-referrer'
      />
      <link
        rel='stylesheet'
        href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
        integrity='sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3'
        crossOrigin='anonymous'
      />
      <link rel='stylesheet' href='/static/css/style.css' />
      <title>URL Shortener</title>
      <script
        src='https://code.jquery.com/jquery-3.5.1.slim.min.js'
        integrity='sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj'
        crossOrigin='anonymous'
      ></script>
      <script
        src='https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js'
        integrity='sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN'
        crossOrigin='anonymous'
      ></script>
      <script
        src='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js'
        integrity='sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13'
        crossOrigin='anonymous'
      ></script>
      <script
        src='https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js'
        integrity='sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV'
        crossOrigin='anonymous'
      ></script>
    </>
  );

  const menu = () => {
    return (
      <>
        <Drawer
          title='Menu'
          placement='left'
          onClose={onClose}
          visible={viewMenu}
        >
          {!isAuthenticated() && (
            <div>
              <ul className='navbar-nav ms-auto'>
                <li className='nav-item-mobile' onClick={registerHandler}>
                  <span className='nav-link active' role='button'>
                    <i className='fas fa-user-plus me-1'></i> Register
                  </span>
                </li>
                <li className='nav-item-mobile' onClick={loginHandler}>
                  <span className='nav-link active' role='button'>
                    <i className='fas fa-sign-in-alt me-1'></i> Login
                  </span>
                </li>
              </ul>
            </div>
          )}

          {isAuthenticated() && (
            <div>
              <ul className='navbar-nav ms-auto'>
                <li className='nav-item-mobile' onClick={handleUrls}>
                  <span className='nav-link active' role='button'>
                    <i className='fa-solid fa-link me-1 fa-sm'></i> My URLs
                  </span>
                </li>
                <li className='nav-item-mobile' onClick={handleProfile}>
                  <span className='nav-link active' role='button'>
                    <i className='fa-solid fa-user-gear me-1 fa-sm'></i>
                    Settings
                  </span>
                </li>
                <li className='nav-item-mobile' onClick={logout}>
                  <span className='nav-link active' role='button'>
                    <i className='fa-solid fa-right-from-bracket me-1 fa-sm'></i>{' '}
                    Logout
                  </span>
                </li>
              </ul>
            </div>
          )}
        </Drawer>
      </>
    );
  };

  const nav = () => (
    <nav className='navbar navbar-dark navbar-expand-sm bg-secondary nav-shadow'>
      <div className='container'>
        <Link href='/'>
          <div className='navbar-brand' role='button'>
            <i className='fa-solid fa-link-slash'></i> URL Shortener
          </div>
        </Link>
        <button
          className='navbar-toggler p-0 border-0 shadow-none me-1'
          type='button'
          onClick={showDrawer}
        >
          {userDetails == null && (
            <span>
              <i
                className='fa-solid fa-bars fa-lg'
                style={{ color: '#fff' }}
              ></i>
            </span>
          )}
          {userDetails && (
            <span>
              <Avatar className='' shape='square' size={38}>
                {isAuthenticated() &&
                  userDetails != undefined &&
                  userDetails.username[0].toUpperCase()}
              </Avatar>
            </span>
          )}
        </button>

        <div id='navbarCollapse' className='collapse navbar-collapse'>
          {!userDetails && (
            <ul className='navbar-nav ms-auto'>
              <li className='nav-item me-3' onClick={registerHandler}>
                <span className='nav-link active' role='button'>
                  <i className='fas fa-user-plus'></i> Register
                </span>
              </li>
              <li className='nav-item' onClick={loginHandler}>
                <span className='nav-link active' role='button'>
                  <i className='fas fa-sign-in-alt'></i> Login
                </span>
              </li>
            </ul>
          )}
          {userDetails && (
            <div className='nav-item px-2 dropdown ms-auto'>
              <div className='user-menu desk'>
                <div
                  className='profile'
                  role='button'
                  id='navbarDropdown'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                >
                  <Avatar shape='square' size={38}>
                    {isAuthenticated() &&
                      userDetails != undefined &&
                      userDetails.username[0].toUpperCase()}
                  </Avatar>
                </div>
                <div
                  className='dropdown-menu menu'
                  aria-labelledby='navbarDropdown'
                >
                  <ul className='ps-0 pt-1'>
                    <li onClick={handleUrls} role='button'>
                      <i className='fa-solid fa-link me-2 fa-sm'></i> My Urls
                    </li>
                    <li onClick={handleProfile} role='button'>
                      <i className='fa-solid fa-user-gear me-2 fa-sm'></i>{' '}
                      Settings
                    </li>
                    <li>
                      <i className='fa-solid fa-right-from-bracket me-2 fa-sm'></i>
                      <a onClick={logout}>Logout</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );

  const footer = () => (
    <>
      <footer className='footer-distributed d-md-flex justify-content-between align-items-center'>
        <div className='footer-left'>
          <p>URL Shortener &copy; 2022 All Rights Reserved</p>
          <p>
            Built with <i class='fa fa-heart text-danger'></i> by{' '}
            <strong>
              <a
                href='https://github.com/Babadinho'
                target='_blank'
                className='text-danger'
              >
                Babadinho
              </a>
            </strong>
          </p>
        </div>
        <div className='footer-right'>
          <Link href='#'>
            <i className='fab fa-twitter'></i>
          </Link>
          <Link href='#'>
            <i className='fab fa-linkedin'></i>
          </Link>
          <Link href='#'>
            <i className='fab fa-github'></i>
          </Link>
        </div>
      </footer>
    </>
  );

  return (
    <>
      <div className='main-container'>
        {head()} {nav()} {menu()}{' '}
        <Login
          loginVisible={loginVisible}
          setLoginVisible={setLoginVisible}
          setRegisterVisible={setRegisterVisible}
        />
        <Register
          registerVisible={registerVisible}
          setRegisterVisible={setRegisterVisible}
          setLoginVisible={setLoginVisible}
        />
        <div className='main'>{children}</div>
        {footer()}
      </div>
    </>
  );
};

export default Layout;
