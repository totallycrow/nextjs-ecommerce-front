import { ProductsGrid } from "../components/ProductsGrid";
import { useCategorySelection } from "../hooks/useCategorySelection";

const CategoriesPage = () => {
  const { data, categoryData, error, setCategory } = useCategorySelection();

  if (data instanceof Error) return <div>Error Fetching Data</div>;
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    // @ts-ignore
    // ??
    <div>
      {data.map((category: string) => {
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
