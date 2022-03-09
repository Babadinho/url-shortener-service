import cookie from 'js-cookie';
import Router from 'next/router';

export const storeUrl = (data) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('shorturl', JSON.stringify(data));
  }
};

export const isGuest = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('shorturl')) {
    return JSON.parse(localStorage.getItem('shorturl'));
  } else {
    return false;
  }
};

// set in cookie
export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

// remove from cookie
export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key);
  }
};

// get from cookie such as stored token
// will be useful when we need to make request to server with auth token
export const getCookie = (key) => {
  if (process.browser) {
    return cookie.get(key);
  }
};
// export const getCookie = (key, req) => {
//   return process.browser
//     ? getCookieFromBrowser(key)
//     : getCookieFromServer(key, req);
// };

export const getCookieFromBrowser = (key) => {
  return cookie.get(key);
};

export const getCookieFromServer = (key, req) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  console.log('req.headers.cookie', req.headers.cookie);
  let token = req.headers.cookie
    .split(';')
    .find((c) => c.trim().startsWith(`${key}=`));
  if (!token) {
    return undefined;
  }
  let tokenValue = token.split('=')[1];
  console.log('getCookieFromServer', tokenValue);
  return tokenValue;
};

// set in localstoarge
export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// remove from localstorage
export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

// authenticate user by passing data to cookie and localstorage during signin
export const authenticate = (data) => {
  setCookie('token', data.token);
  setLocalStorage('urlshortener', data.user);
};

// update user localStorage
export const reAuthenticate = (data) => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('urlshortener')) {
      let auth = JSON.parse(localStorage.getItem('urlshortener'));
      auth = data;
      localStorage.setItem('urlshortener', JSON.stringify(auth));
    }
  }
};

// access user info from localstorage
export const isAuthenticated = () => {
  if (process.browser) {
    const cookieChecked = getCookie('token');
    if (cookieChecked) {
      if (localStorage.getItem('urlshortener')) {
        return JSON.parse(localStorage.getItem('urlshortener'));
      } else {
        return false;
      }
    }
  }
};
