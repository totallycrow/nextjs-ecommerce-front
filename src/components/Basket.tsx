import { useSelector } from "react-redux";
import { usePromoInput } from "../logic/hooks/usePromoInput";
import { RootState } from "../logic/store/store";

export const Basket = () => {
  const { promoInput, setPromoInput } = usePromoInput();
  const basketState = useSelector((state: RootState) => state.basket);
  const idsInBasket = Object.keys(basketState.items);
  console.log(idsInBasket);

  return (
    <div className="w-2/6 bg-slate-100">
      Basket TOTALS: {basketState.totalPrice}
      <input
        type="text"
        value={promoInput}
        onChange={(e) => setPromoInput(e.target.value)}
        placeholder="PROMO CODE"
      />
      <div>
        {idsInBasket.map((item) => (
          <div key={basketState.items[item].id}>
            {basketState.items[item].title}
            <div>Qty: {basketState.items[item].qty}</div>
          </div>
        ))}
      </div>
      <button className="p-2 bg-slate-200">MOCK CHECKOUT</button>
    </div>
  );
};
