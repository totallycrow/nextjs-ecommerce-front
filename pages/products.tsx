import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { CartControls } from "../components/CartControls";
import ProductsAPI from "../services/ProductsAPI";
import { IProduct } from "../types/productTypes";

export const ProductsPage = (props: any) => {
  const { data, error } = useQuery(
    ["products"],
    () => ProductsAPI.getAllProducts<Array<IProduct>>(),
    { initialData: props.posts }
  );

  if (error) return <div>Error Fetching Data</div>;
  if (data instanceof Error) return <div>Error Fetching Data</div>;
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
  return { props: { products } };
}
