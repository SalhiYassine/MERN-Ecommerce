import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_CHANGE_QTY_ITEM,
} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM: {
      const product = action.payload;
      const itemExists = state.cartItems.find(
        (x) => x.product === product.product
      );
      if (itemExists) {
        return {
          ...state,
          // If the product is found, replace it with the new product, else move on
          cartItems: [
            ...state.cartItems.map((x) =>
              x.product === itemExists.product
                ? { ...product, qty: product.qty + x.qty }
                : x
            ),
          ],
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, product],
        };
      }
    }

    case CART_CHANGE_QTY_ITEM: {
      const product = action.payload;

      const itemExists = state.cartItems.find(
        (x) => x.product === product.product
      );
      if (itemExists) {
        return {
          ...state,
          // If the product is found, replace it with the new product, else move on
          cartItems: [
            ...state.cartItems.map((x) =>
              x.product === itemExists.product
                ? { ...product, qty: product.qty }
                : x
            ),
          ],
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, product],
        };
      }
    }
    case CART_REMOVE_ITEM: {
      return {
        ...state,
        // Adds all items that doesn't match the item to a list and returns that
        cartItems: state.cartItems.filter(
          (x) => x.product !== action.payload.id
        ),
      };
    }
    default:
      return state;
  }
};
