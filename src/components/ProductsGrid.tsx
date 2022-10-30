import { IProductsData } from "../types/productTypes";
import { ProductTile } from "./ProductTile";

export const ProductsGrid: React.FC<IProductsData> = ({
  data,
}: IProductsData) => {
  return (
    <div>
      <div className="w-2/3 m-auto grid grid-cols-3">
        {data && data.map((item) => <ProductTile key={item.id} item={item} />)}
      </div>
    </div>
  );
};
