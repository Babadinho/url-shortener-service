export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER':
      return { ...state, ...action.payload };
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
