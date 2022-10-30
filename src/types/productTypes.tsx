export interface IProduct {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface IProductProps {
  data: IProduct;
}

export interface IProductsData {
  data: Array<IProduct>;
}

export interface IProductTile {
  item: IProduct;
}
