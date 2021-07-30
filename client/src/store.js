import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducer';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
} from './reducers/orderReducer';
import { cartReducer } from './reducers/cartReducer';
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateDetailsReducer,
} from './reducers/userReducer';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateDetails: userUpdateDetailsReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
});

const localStorageCart = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const localUserInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : {};

const localShippingAddress = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};
const localPaymentMethod = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : {};

const initialState = {
  cart: {
    cartItems: localStorageCart,
    shippingAddress: localShippingAddress,
    paymentMethod: localPaymentMethod,
  },

  userLogin: { userInfo: localUserInfo },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
