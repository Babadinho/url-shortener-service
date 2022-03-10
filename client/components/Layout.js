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
        href='https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css'
        integrity='sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=='
        crossOrigin='anonymous'
        referrerPolicy='no-referrer'
      />
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
              <ul class='navbar-nav ms-auto'>
                <li class='nav-item-mobile' onClick={registerHandler}>
                  <span class='nav-link active' role='button'>
                    <i class='fas fa-user-plus me-1'></i> Register
                  </span>
                </li>
                <li class='nav-item-mobile' onClick={loginHandler}>
                  <span class='nav-link active' role='button'>
                    <i class='fas fa-sign-in-alt me-1'></i> Login
                  </span>
                </li>
              </ul>
            </div>
          )}

          {isAuthenticated() && (
            <div>
              <ul class='navbar-nav ms-auto'>
                <li class='nav-item-mobile'>
                  <Link href='#'>
                    <span class='nav-link active' role='button'>
                      <i class='fa-solid fa-user me-1 fa-sm'></i> Dashboard
                    </span>
                  </Link>
                </li>
                <li class='nav-item-mobile' onClick={logout}>
                  <span class='nav-link active' role='button'>
                    <i class='fa-solid fa-right-from-bracket me-1 fa-sm'></i>{' '}
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
    <nav class='navbar navbar-dark navbar-expand-sm bg-secondary nav-shadow'>
      <div class='container'>
        <a href='/' class='navbar-brand'>
          <i class='fa-solid fa-link-slash'></i> URL Shortener
        </a>
        <button
          class='navbar-toggler p-0 border-0 shadow-none me-1'
          type='button'
          onClick={showDrawer}
        >
          {userDetails == null && (
            <span>
              <i class='fa-solid fa-bars fa-lg' style={{ color: '#fff' }}></i>
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
        <div id='navbarCollapse' class='collapse navbar-collapse'>
          <ul class='navbar-nav ms-auto'>
            <>
              {!isAuthenticated() && (
                <>
                  <li class='nav-item me-3' onClick={registerHandler}>
                    <span class='nav-link active' role='button'>
                      <i class='fas fa-user-plus'></i> Register
                    </span>
                  </li>
                  <li class='nav-item' onClick={loginHandler}>
                    <span class='nav-link active' role='button'>
                      <i class='fas fa-sign-in-alt'></i> Login
                    </span>
                  </li>
                </>
              )}
              {isAuthenticated() && (
                <div class='nav-item px-2 dropdown'>
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
                      <ul className='ps-0'>
                        <li>
                          <i class='fa-solid fa-user me-1 fa-sm'></i>{' '}
                          <Link href='#'>Dashboard</Link>
                        </li>
                        <li>
                          <i class='fa-solid fa-right-from-bracket me-1 fa-sm'></i>
                          <a onClick={logout}>Logout</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </>
          </ul>
        </div>
      </div>
    </nav>
  );

  const headerSection = () => (
    <section className='section-hero flex-column flex-column-reverse flex-md-row d-flex align-items-center bg-white pt-5'>
      <div className='header-section'>
        <h2>We are hiring.</h2>
        <p>
          Are you looking for a new challenge? You are passionate about
          innovation and enjoy working with people? Then you've come to the
          right place.
        </p>
      </div>
      <div class='image-wrapper'>
        <img className='img-fluid' src='/images/short-header.png' />
      </div>
    </section>
  );

  const footer = () => (
    <>
      <footer class='footer-distributed d-md-flex justify-content-between align-items-center'>
        <div class='footer-left'>
          <p>URL Shortener &copy; 2022 All Rights Reserved</p>
        </div>
        <div class='footer-right'>
          <Link href='#'>
            <i class='fab fa-twitter'></i>
          </Link>
          <Link href='#'>
            <i class='fab fa-linkedin'></i>
          </Link>
          <Link href='#'>
            <i class='fab fa-github'></i>
          </Link>
        </div>
      </footer>
    </>
  );

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default Layout;
