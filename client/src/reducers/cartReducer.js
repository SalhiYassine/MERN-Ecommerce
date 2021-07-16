import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
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
    default:
      return state;
  }
};
