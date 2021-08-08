import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_PROFILE_REQUEST,
  ORDER_PROFILE_SUCCESS,
  ORDER_PROFILE_FAIL,
  ORDER_PROFILE_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_RESET,
  ORDER_SHIPPED_REQUEST,
  ORDER_SHIPPED_SUCCESS,
  ORDER_SHIPPED_FAIL,
  ORDER_SHIPPED_RESET,
} from '../constants/orderConstants';

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const orderListDetailsReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { ...state, loading: true };
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_LIST_RESET:
      return { orders: [] };

    default:
      return state;
  }
};
export const orderProfileReducer = (
  state = { loading: true, orders: [] },
  action
) => {
  switch (action.type) {
    case ORDER_PROFILE_REQUEST:
      return { ...state, loading: true };
    case ORDER_PROFILE_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_PROFILE_FAIL:
      return { loading: false, errors: action.payload };
    case ORDER_PROFILE_RESET:
      return { orders: [] };

    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { ...state, loading: true };
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_PAY_RESET:
      return {};

    default:
      return state;
  }
};

export const orderShipReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_SHIPPED_REQUEST:
      return { ...state, loading: true };
    case ORDER_SHIPPED_SUCCESS:
      return { loading: false, success: true };
    case ORDER_SHIPPED_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_SHIPPED_RESET:
      return {};

    default:
      return state;
  }
};
