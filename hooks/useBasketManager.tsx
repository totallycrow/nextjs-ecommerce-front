import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const useBasketManager = () => {
  const basketState = useSelector((state: RootState) => state.basket);
  const basketItems = Object.keys(basketState);
  const [totalPrice, setTotalPrice] = useState(0);
  const [promoInput, setPromoInput] = useState("");
  const [isDiscount, setIsDiscount] = useState(false);

  const mockPromo = "20OFF";

  //   MONITOR TOTAL PRICE
  useEffect(() => {
    const totals = basketItems.map(
      (item) => basketState[item].price * 100 * basketState[item].qty
    );

    const sum = totals.reduce((prev, curr) => prev + curr, 0) / 100;

    if (isDiscount) {
      const discountTotals = sum - sum * 0.2;
      setTotalPrice(Number(discountTotals.toFixed(2)));
    } else setTotalPrice(sum);
  }, [basketItems, isDiscount]);

  //   MONITOR PROMO CODE
  useEffect(() => {
    if (promoInput.toUpperCase() === mockPromo) {
      setIsDiscount(true);
    } else setIsDiscount(false);
  }, [promoInput]);

  return { totalPrice, promoInput, setPromoInput, basketItems, basketState };
};
