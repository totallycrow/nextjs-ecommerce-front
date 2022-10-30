import useSWR from "swr";
import { CartControls } from "../../components/CartControls";
import ProductsAPI from "../../services/ProductsAPI";
import { IProduct } from "../../types/productTypes";
import { useRouter } from "next/router";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

export const ProductPage = ({ data }) => {
  const router = useRouter();
  const { id } = router.query;
  console.log(data);

  // const { data, isLoading, error } = useQuery(["product"], () =>
  //   ProductsAPI.get<IProduct>(`products/${id}`)
  // );

  return (
    <div>
      <h1>{data.title}</h1>
      <div>
        <p>Price: {data.price}</p>
        <p>Description: {data.description}</p>
        <p>Category: {data.category}</p>
        <Image
          src={data.image}
          alt={data.title}
          className="w-40 h-40"
          height={100}
          width={100}
        />
        <CartControls item={data} />
      </div>
    </div>
  );
};

export default ProductPage;

export async function getStaticPaths() {
  // Return a list of possible value for id

  const products = await ProductsAPI.getAllProducts<Array<IProduct>>();

  if (products instanceof Error) return;

  const paths = products.map((item) => {
    return {
      params: { id: item.id.toString() },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  // Fetch necessary data for the blog post using params.id
  // const data = await ProductsAPI.getAllProducts();
  const id = context.params.id;

  const res = await fetch("https://fakestoreapi.com/products/" + id);
  const data = await res.json();

  return {
    props: {
      data: data,
    },
  };
}
