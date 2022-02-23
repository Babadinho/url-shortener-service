import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { authReducer } from './reducers/auth';
import { userReducer, urlsReducer } from './reducers/user';

const middleware = [thunk];

const reducer = combineReducers({
  UrlShortenerAuth: authReducer,
  UrlShortenerUser: userReducer,
  UrlShortenerUrls: urlsReducer,
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
