import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { CartControls } from "../components/CartControls";
import ProductsAPI from "../services/ProductsAPI";
import { IProduct } from "../types/productTypes";

interface IProps {
  data: Array<IProduct>;
}

export const ProductsPage = ({ data }: IProps) => {
  return (
    <div>
      ProductsPage
      <div className="grid grid-cols-3">
        {data &&
          data.map((item: IProduct) => (
            <div key={item.id}>
              <Link href={"/products/" + item.id}>
                <Image
                  src={item.image}
                  className="w-24 h-24"
                  alt={item.title}
                  width={100}
                  height={100}
                ></Image>
              </Link>
              <CartControls item={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductsPage;

export async function getStaticProps() {
  const products = await ProductsAPI.getAllProducts<Array<IProduct>>();
  return {
    props: {
      data: products,
    },
  };
}
