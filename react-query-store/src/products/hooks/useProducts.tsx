import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/actions";

interface Options {
  filterKey?: string;
}

export const useProducts = ({ filterKey }: Options) => {
  const {
    data: products = [],
    isLoading,
    isError,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["products", { filterKey }],
    queryFn: () => getProducts({ filterKey }),
    staleTime: 1000 * 60 * 60,
  });

  return {
    products,
    isLoading,
    error,
    isError,
    isFetching,
  };
};
