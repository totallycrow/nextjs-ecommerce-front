import useSWR from "swr";
import { CartControls } from "../../components/CartControls";
import ProductsAPI from "../../services/ProductsAPI";
import { IProduct } from "../../types/productTypes";
import { useRouter } from "next/router";
import Image from "next/image";

export const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR("products/" + id, (arg0) =>
    ProductsAPI.get<IProduct>(arg0)
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  if (error) return <div>Error Fetching Data</div>;
  if (data instanceof Error) return <div>Error Fetching Data</div>;

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
