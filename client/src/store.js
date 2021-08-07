import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productEditReducer,
  productCreateReducer,
} from './reducers/productReducer';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderProfileReducer,
} from './reducers/orderReducer';
import { cartReducer } from './reducers/cartReducer';
import {
  userAdminDeleteUserReducer,
  userAdminListReducer,
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateDetailsReducer,
  userAdminGetUserReducer,
  userAdminUpdateReducer,
} from './reducers/userReducer';

const reducer = combineReducers({
  productCreate: productCreateReducer,
  productEdit: productEditReducer,
  productDelete: productDeleteReducer,
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
  orderProfile: orderProfileReducer,
  userAdminList: userAdminListReducer,
  userAdminDeleteUser: userAdminDeleteUserReducer,
  userAdminGetUser: userAdminGetUserReducer,
  userAdminUpdateUser: userAdminUpdateReducer,
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
