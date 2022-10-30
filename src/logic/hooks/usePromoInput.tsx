import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDiscount } from "../slices/basketSlice";
import { RootState } from "../store/store";

const mockPromo = "20OFF";

export const usePromoInput = () => {
  const dispatch = useDispatch();
  const [promoInput, setPromoInput] = useState("");

  //   MONITOR PROMO CODE
  useEffect(() => {
    if (promoInput.toUpperCase() === mockPromo) {
      dispatch(setDiscount(true));
    } else dispatch(setDiscount(false));
  }, [promoInput]);

  return { promoInput, setPromoInput };
};
