export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER':
      return { ...state, ...action.payload };
    case 'LOGOUT':
      state = null;
    default:
      return state;
  }
};
export const urlsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'URLs':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const guestReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GUEST':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
