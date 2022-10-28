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

  return { data, error, setCategory, category };
};
