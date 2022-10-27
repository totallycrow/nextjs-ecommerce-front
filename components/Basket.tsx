import { useBasketManager } from "../hooks/useBasketManager";

export const Basket = () => {
  const { totalPrice, promoInput, setPromoInput, basketItems, basketState } =
    useBasketManager();

  return (
    <div className="w-2/6 bg-slate-100">
      Basket TOTALS: {totalPrice}
      <input
        type="text"
        value={promoInput}
        onChange={(e) => setPromoInput(e.target.value)}
        placeholder="PROMO CODE"
      />
      <div>
        {basketItems.map((item) => (
          <div key={basketState[item].id}>
            {basketState[item].title}
            <div>Qty: {basketState[item].qty}</div>
          </div>
        ))}
      </div>
      <button className="p-2 bg-slate-200">MOCK CHECKOUT</button>
    </div>
  );
};
