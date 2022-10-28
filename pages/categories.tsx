import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { ProductsGrid } from "../components/ProductsGrid";
import { useCategorySelection } from "../hooks/useCategorySelection";
import ProductsAPI, { IProduct } from "../services/ProductsAPI";

const CategoriesPage = () => {
  const { data, error, setCategory, category } = useCategorySelection();

  const shouldFetch = category !== null;
  const categoryData = useQuery(
    ["products/category/"],
    () =>
      fetch(`https://fakestoreapi.com/products/category/${category}`).then(
        (res) => res.json()
      ),
    { enabled: shouldFetch }
  );

  if (data instanceof Error) return <div>Error Fetching Data</div>;
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  console.log(categoryData.data);

  return (
    // @ts-ignore
    // ??
    <div>
      {data.map((category: string) => {
        console.log();
        return (
          <div key={category}>
            <button onClick={() => setCategory(category)}>{category}</button>
          </div>
        );
      })}

      <div>
        <div className="h-10 bg-slate-400">
          <h2>Category Items</h2>
        </div>
      </div>
      {/* ?? */}
      {/* @ts-ignore */}
      {categoryData.data && <ProductsGrid data={categoryData.data} />}
    </div>
  );
};

export default CategoriesPage;
