import { useState } from "react";
import useSWR from "swr";
import ProductsAPI from "../services/ProductsAPI";

export const useCategorySelection = () => {
  const [category, setCategory] = useState<string | null>(null);
  const { data, error } = useSWR("products/categories", (arg0) =>
    ProductsAPI.get<Array<string>>(arg0)
  );

  const shouldFetch = category === null ? false : true;

  const categoryData = useSWR(
    shouldFetch ? "products/category/" + category : null,
    ProductsAPI.get
  );
  return { data, categoryData, error, setCategory };
};
