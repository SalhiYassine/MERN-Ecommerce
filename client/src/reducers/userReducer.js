import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_DETAILS_REQUEST,
  USER_UPDATE_DETAILS_SUCCESS,
  USER_UPDATE_DETAILS_FAIL,
  USER_UPDATE_DETAILS_RESET,
  USER_DETAILS_RESET,
  USER_ADMIN_LIST_REQUEST,
  USER_ADMIN_LIST_SUCCESS,
  USER_ADMIN_LIST_FAIL,
  USER_ADMIN_LIST_RESET,
  USER_ADMIN_DELETE_REQUEST,
  USER_ADMIN_DELETE_SUCCESS,
  USER_ADMIN_DELETE_FAIL,
  USER_ADMIN_UPDATE_DETAILS_REQUEST,
  USER_ADMIN_UPDATE_DETAILS_SUCCESS,
  USER_ADMIN_UPDATE_DETAILS_FAIL,
  USER_GET_DETAILS_REQUEST,
  USER_GET_DETAILS_SUCCESS,
  USER_GET_DETAILS_FAIL,
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, userDetails: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return { user: {} };

    default:
      return state;
  }
};
export const userUpdateDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_DETAILS_REQUEST:
      return { loading: true };
    case USER_UPDATE_DETAILS_SUCCESS:
      return { loading: false, success: true, userDetails: action.payload };
    case USER_UPDATE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};

export const userAdminListReducer = (state = { userList: [] }, action) => {
  switch (action.type) {
    case USER_ADMIN_LIST_REQUEST:
      return { loading: true, userList: [] };
    case USER_ADMIN_LIST_SUCCESS:
      return { loading: false, success: true, userList: action.payload };
    case USER_ADMIN_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_ADMIN_LIST_RESET:
      return { userList: [] };

    default:
      return state;
  }
};

export const userAdminDeleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ADMIN_DELETE_REQUEST:
      return { loading: true, userList: [] };
    case USER_ADMIN_DELETE_SUCCESS:
      return { loading: false, success: true, userList: action.payload };
    case USER_ADMIN_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const userAdminUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ADMIN_UPDATE_DETAILS_REQUEST:
      return { loading: true, userList: [] };
    case USER_ADMIN_UPDATE_DETAILS_SUCCESS:
      return { loading: false, success: true, userList: action.payload };
    case USER_ADMIN_UPDATE_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const userAdminGetUserReducer = (
  state = { userDetails: {} },
  action
) => {
  switch (action.type) {
    case USER_GET_DETAILS_REQUEST:
      return { loading: true, userDetails: {} };
    case USER_GET_DETAILS_SUCCESS:
      return { loading: false, success: true, userDetails: action.payload };
    case USER_GET_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
