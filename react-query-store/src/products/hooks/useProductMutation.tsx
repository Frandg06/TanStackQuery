import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../services/actions";
import { Product } from "../interfaces/products";

export const useProductMutation = () => {
  const queryCLient = useQueryClient();

  const productMutation = useMutation({
    mutationFn: createProduct,
    onMutate: (data) => {
      console.log("Mutando - Optimistic");

      // Optimistic product

      const optimisticProduct = {
        id: Math.random(),
        ...data,
      };

      // almacenar el producto en el cache
      queryCLient.setQueryData(
        ["products", { filterKey: data.category }],
        (old: Product[]) => {
          if (!old) return invalidateQueries(data.category);
          return [...old, optimisticProduct];
        }
      );

      return { optimisticProduct };
    },

    onSuccess: (data, variables, context) => {
      // queryCLient.invalidateQueries({
      //   queryKey: ["products", { filterKey: data.category }],
      // });

      // on succes estandard
      // queryCLient.setQueryData(
      //   ["products", { filterKey: data.category }],
      //   (old: Product[]) => {
      //     if (!old) return invalidateQueries(data.category);
      //     return [...old, data];
      //   }
      // );
      //onSuccess optimistic
      queryCLient.setQueryData(
        ["products", { filterKey: data.category }],
        (old: Product[]) => {
          if (!old) return invalidateQueries(data.category);

          return old.map((cacheProduct) =>
            cacheProduct.id === context?.optimisticProduct.id
              ? data
              : cacheProduct
          );
        }
      );
    },
    onSettled: () => {
      console.log("settled");
    },
  });

  const invalidateQueries = (category: string) => {
    queryCLient.invalidateQueries({
      queryKey: ["products", { filterKey: category }],
    });
  };

  return productMutation;
};
