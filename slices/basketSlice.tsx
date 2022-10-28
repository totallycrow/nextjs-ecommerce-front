import { createSlice } from "@reduxjs/toolkit";
import {
  calculateDiscount,
  calculatePrice,
  removeDiscountFromTotals,
} from "../utils/calculatePricing";

export interface IBasketItem {
  id: string;
  qty: number;
  image: string;
  title: string;
  price: number;
}

export interface IBasketState {
  items: {
    [id: string]: IBasketItem;
  };
  totalPrice: number;
  isDiscount: Boolean;
}

export interface IAction {
  type: string;
  payload: IBasketItem;
}

const initialState: IBasketState = {
  items: {},
  totalPrice: 0,
  isDiscount: false,
};

export const basket = createSlice({
  name: "basket",
  initialState,
  reducers: {
    updateBasket: (state, action: IAction) => {
      const qtyChange = action.payload.qty;
      const targetProductId = action.payload.id;
      const { image, title, price } = action.payload;

      // if not in basket - add to basket
      if (state.items[targetProductId] === undefined && qtyChange === 1) {
        state.items[targetProductId] = {
          id: targetProductId,
          qty: 1,
          image: image,
          title: title,
          price: price,
        };

        if (state.isDiscount) {
          state.totalPrice = state.totalPrice + calculateDiscount(price);
        } else {
          state.totalPrice += price;
        }
        return;
      }

      // Remove from basket
      if (state.items[targetProductId].qty === 1 && qtyChange === -1) {
        state.totalPrice = calculatePrice(
          qtyChange,
          state.items[targetProductId].price,
          state.totalPrice,
          state.isDiscount
        );
        delete state.items[targetProductId];
        return state;
      }
      // Handle qty change
      state.items[targetProductId].qty += qtyChange;
      // Handle total pricing
      state.totalPrice = calculatePrice(
        qtyChange,
        state.items[targetProductId].price,
        state.totalPrice,
        state.isDiscount
      );
    },
    setDiscount(state, action) {
      const isDiscount = action.payload;
      if (state.isDiscount === isDiscount) return;

      if (state.isDiscount === false && isDiscount === true) {
        state.totalPrice = calculateDiscount(state.totalPrice);
      }
      if (state.isDiscount === true && isDiscount === false) {
        state.totalPrice = removeDiscountFromTotals(state.totalPrice);
      }
      state.isDiscount = isDiscount;
    },
  },
});

export const { updateBasket, setDiscount } = basket.actions;
export default basket.reducer;
