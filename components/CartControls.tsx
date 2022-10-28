import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBasket } from "../slices/basketSlice";
import { RootState } from "../store/store";
import { IProductTile } from "../types/productTypes";

// export const CartControls = ({ item }: IProduct) => {
export const CartControls: React.FC<IProductTile> = ({
  item,
}: IProductTile) => {
  const dispatch = useDispatch();
  const basketState = useSelector((state: RootState) => state.basket.items);
  return (
    <div>
      <div>
        {" "}
        <button
          className="p-2 bg-slate-400 m-2"
          onClick={() =>
            dispatch(
              updateBasket({
                id: item.id,
                qty: 1,
                price: item.price,
                title: item.title,
                image: item.image,
              })
            )
          }
        >
          Add To Basket
        </button>
      </div>

      <div>
        {basketState[item.id] && basketState[item.id].qty > 0 ? (
          <button
            className="p-2 bg-slate-400 m-2"
            onClick={() =>
              dispatch(
                updateBasket({
                  id: item.id,
                  qty: -1,
                  price: item.price,
                  title: item.title,
                  image: item.image,
                })
              )
            }
          >
            Remove from basket
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
