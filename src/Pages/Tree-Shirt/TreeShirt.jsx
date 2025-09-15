import ProductList from "../../Components/Layout/ProductList";

const TreeShirt = () => {
  return (
    <ProductList
      title="Shirt Collection"
      queryKey="Shirts"
      endpoint="shirts"
    />
  );
};

export default TreeShirt;