export const storeUrl = (data) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('shorturl', JSON.stringify(data));
  }
};

export const authStoreUrl = (data) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('urlshortener', JSON.stringify(data));
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

export const isAuthenticated = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('urlshortener')) {
    return JSON.parse(localStorage.getItem('urlshortener'));
  } else {
    return false;
  }
};
