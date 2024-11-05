import { Product, productsApi } from "..";

interface GetProductsOptions {
  filterKey?: string;
}

const sleep = (seconds: number) => {
  const time = seconds * 1000;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const getProducts = async ({ filterKey }: GetProductsOptions) => {
  const urlParams = new URLSearchParams();

  if (filterKey) {
    urlParams.append("category", filterKey);
  }

  const { data } = await productsApi.get<Product[]>("/products", {
    params: urlParams,
  });

  return data;
};

export const getProductById = async (id: number) => {
  const { data } = await productsApi.get<Product>(`/products/${id}`);
  return data;
};

export interface ProductLike {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const createProduct = async (product: ProductLike) => {
  await sleep(5);
  throw new Error("Error al crear producto");
  const { data } = await productsApi.post<Product>("/products", product);
  return data;
};
