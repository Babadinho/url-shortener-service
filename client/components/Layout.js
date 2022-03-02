import React, { useState, useEffect } from 'react';
import { Drawer, Button } from 'antd';
import Head from 'next/head';
import Link from 'next/link';
import Login from '../pages/login';
import Register from '../pages/register';
import { isAuthenticated } from '../actions/localStorage';
import { useSelector } from 'react-redux';

const Layout = ({ children }) => {
  const [viewMenu, setViewMenu] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const [userDetails, SetUserDetails] = useState(null);

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
      SetUserDetails(userInfo);
    }
  }, [userInfo]);

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
        crossorigin='anonymous'
        referrerpolicy='no-referrer'
      />
      <link
        rel='stylesheet'
        href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
        integrity='sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3'
        crossorigin='anonymous'
      />
      <link rel='stylesheet' href='/static/css/style.css' />
      <title>URL Shortener</title>
      <script
        src='https://code.jquery.com/jquery-3.5.1.slim.min.js'
        integrity='sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj'
        crossorigin='anonymous'
      ></script>
      <script
        src='https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js'
        integrity='sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN'
        crossorigin='anonymous'
      ></script>
      <script
        src='https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js'
        integrity='sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV'
        crossorigin='anonymous'
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
          <div>
            <ul class='navbar-nav ms-auto'>
              <li class='nav-item-mobile' onClick={registerHandler}>
                <span class='nav-link active' role='button'>
                  <i class='fas fa-user-plus'></i> Register
                </span>
              </li>
              <li class='nav-item-mobile' onClick={loginHandler}>
                <span class='nav-link active' role='button'>
                  <i class='fas fa-sign-in-alt'></i> Login
                </span>
              </li>
            </ul>
          </div>
        </Drawer>
      </>
    );
  };

  const nav = () => (
    <nav class='navbar navbar-dark navbar-expand-sm bg-success nav-shadow'>
      <div class='container'>
        <a href='/' class='navbar-brand'>
          <i class='fas fa-link'></i> URL Shortener
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
              <i
                class='fa-solid fa-circle-user'
                style={{ color: '#fff', fontSize: '2.3rem' }}
              ></i>
            </span>
          )}
        </button>
        <div id='navbarCollapse' class='collapse navbar-collapse'>
          <ul class='navbar-nav ms-auto'>
            <>
              {!isAuthenticated() && (
                <>
                  <li class='nav-item me-2' onClick={registerHandler}>
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
                <li class='nav-item' onClick={loginHandler}>
                  <Link href='#'>
                    <div className='user-menu desk'>
                      {/* <span className='account-text'>My Account</span>{' '} */}
                      <span>
                        <i
                          class='fa-solid fa-circle-user'
                          style={{ color: '#fff', fontSize: '2.3rem' }}
                        ></i>
                      </span>
                    </div>
                  </Link>
                </li>
              )}
            </>
          </ul>
        </div>
      </div>
    </nav>
  );

  const footer = () => (
    <>
      <footer class='footer-distributed d-md-flex justify-content-between align-items-center'>
        <div class='footer-left'>
          <p>URL Shortener &copy; 2022 All Rights Reserved</p>
        </div>
        <div class='footer-right'>
          <a href='#'>
            <i class='fab fa-facebook'></i>
          </a>
          <a href='#'>
            <i class='fab fa-twitter'></i>
          </a>
          <a href='#'>
            <i class='fab fa-linkedin'></i>
          </a>
          <a href='#'>
            <i class='fab fa-github'></i>
          </a>
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
        <div className='container main mt-md-3 mt-sm-1'>{children}</div>
        {footer()}
      </div>
    </React.Fragment>
  );
};

export default Layout;
