import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../services/actions";

interface Options {
  id: number;
}

export const useProduct = ({ id }: Options) => {
  const {
    data: product,
    isLoading,
    isError,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(id),
    staleTime: 1000 * 60 * 60,
  });

  return {
    product,
    isLoading,
    error,
    isError,
    isFetching,
  };
};
