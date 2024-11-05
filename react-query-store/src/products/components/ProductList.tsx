import { Product, ProductCard } from "..";
import { usePrefetchProduct } from "../hooks/usePrefetchProduct";

interface Props {
  products: Product[];
}
export const ProductList = ({ products }: Props) => {
  const { preFetchProduct } = usePrefetchProduct();
  return (
    <div className="grid justify-center grid-cols-1 gap-2 mt-2 sm:grid-cols-2 xl:grid-cols-3 max-w-max">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onPreFetch={preFetchProduct}
        />
      ))}
    </div>
  );
};
