import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useState } from "react";
import useSWR from "swr";
import ProductsAPI, { IProduct } from "../services/ProductsAPI";

export const useCategorySelection = () => {
  const [category, setCategory] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery(["categories"], () =>
    ProductsAPI.get<Array<string>>("products/categories")
  );

  const shouldFetch = category !== null;
  const categoryData = useQuery(
    [`products/category/${category}`],
    () =>
      fetch(`https://fakestoreapi.com/products/category/${category}`).then(
        (res) => res.json()
      ),
    { enabled: shouldFetch }
  );

  return { data, error, setCategory, category, categoryData };
};
