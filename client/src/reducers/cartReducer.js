import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_CHANGE_QTY_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants';

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
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
    case CART_SAVE_SHIPPING_ADDRESS: {
      return {
        ...state,
        shippingAddress: action.payload,
      };
    }
    case CART_SAVE_PAYMENT_METHOD: {
      return {
        ...state,
        paymentMethod: action.payload,
      };
    }
    default:
      return state;
  }
};
