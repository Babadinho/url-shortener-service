import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { userReducer, urlsReducer, guestReducer } from './reducers/user';

const middleware = [thunk];

const reducer = combineReducers({
  UrlShortenerUser: userReducer,
  UrlShortenerUrls: urlsReducer,
  UrlShortenerGuest: guestReducer,
});

let userState = null;

if (typeof window !== 'undefined') {
  userState = window.localStorage.getItem('urlshortener')
    ? JSON.parse(window.localStorage.getItem('urlshortener'))
    : null;
}

const InitialState = {
  UrlShortenerUser: userState,
};

const store = createStore(
  reducer,
  InitialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
