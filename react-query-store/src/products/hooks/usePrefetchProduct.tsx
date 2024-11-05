import { useQueryClient } from "@tanstack/react-query";
import { getProductById } from "../services/actions";

export const usePrefetchProduct = () => {
  const queryClient = useQueryClient();

  const preFetchProduct = (id: number) => {
    queryClient.prefetchQuery({
      queryKey: ["products", id],
      queryFn: () => getProductById(id),
    });
  };

  return { preFetchProduct };
};
