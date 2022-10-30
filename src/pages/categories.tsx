import { ProductsGrid } from "../components/ProductsGrid";
import { useCategorySelection } from "../logic/hooks/useCategorySelection";

const CategoriesPage = () => {
  const { data, error, setCategory, category, categoryData } =
    useCategorySelection();

  if (data instanceof Error) return <div>Error Fetching Data</div>;
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  console.log(categoryData.data);

  return (
    <div>
      {data.map((category: string) => {
        console.log();
        return (
          <div key={category}>
            <button
              onClick={() => {
                setCategory(category);
                categoryData.refetch();
              }}
            >
              {category}
            </button>
          </div>
        );
      })}

      <div>
        <div className="h-10 bg-slate-400">
          <h2>Category Items</h2>
        </div>
      </div>

      {categoryData.data && <ProductsGrid data={categoryData.data} />}
    </div>
  );
};

export default CategoriesPage;
