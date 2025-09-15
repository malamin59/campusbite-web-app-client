import ProductList from "../../Components/Layout/ProductList";

const Pants = () => {
  return (
    <ProductList
      title="Pants Collection"
      queryKey="Pant"
      endpoint="pants"
    />
  );
};

export default Pants;