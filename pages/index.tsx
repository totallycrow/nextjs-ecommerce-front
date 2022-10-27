import ProductsAPI from "../services/ProductsAPI";
import useSWR from "swr";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ProductsGrid } from "../components/ProductsGrid";
import { IProduct } from "../types/productTypes";
import { GetServerSideProps } from "next";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { dehydrate } from "@tanstack/react-query";

const featuredHomepageCategory = "women's clothing";

const HomePage = () => {
  const { data, isLoading, error } = useQuery(["products"], () =>
    ProductsAPI.getAllProducts<Array<IProduct>>()
  );

  if (data === undefined || data instanceof Error) return <div>error</div>;
  if (isLoading) return <div>loading...</div>;
  if (error) return <div>Error Fetching Data</div>;
  return <ProductsGrid data={data} />;
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["products"], () =>
    ProductsAPI.getAllProducts<Array<IProduct>>()
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
