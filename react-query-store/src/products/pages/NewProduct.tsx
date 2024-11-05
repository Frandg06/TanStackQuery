import { Button, Image, Input, Textarea } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { useProductMutation } from "../hooks/useProductMutation";
// import { Select, SelectSection, SelectItem } from "@nextui-org/select";

interface Inputs {
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
}
export const NewProduct = () => {
  const productMutation = useProductMutation();

  const { control, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      title: "Reclado",
      price: 0,
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      description:
        "Dolore nostrud velit est labore non. Anim ut velit ea deserunt mollit eu. Sunt anim laboris irure in. Qui velit proident ex cupidatat laborum labore.",
      category: "men's clothing",
    },
  });

  const onSubmit = (data: Inputs) => {
    productMutation.mutate(data);
  };

  return (
    <div className="flex-col w-full">
      <h1 className="text-2xl font-bold">Nuevo producto</h1>

      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-around">
          <div className="flex-col w-[500px]">
            <Controller
              control={control}
              name="title"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  className="mt-2"
                  type="text"
                  label="Titulo del producto"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="price"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  className="mt-2"
                  type="number"
                  label="Precio del producto"
                  value={field.value?.toString()}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />
            <Controller
              control={control}
              name="image"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  className="mt-2"
                  type="url"
                  label="Url del producto"
                  value={field.value?.toString()}
                  onChange={field.onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              rules={{ required: true }}
              render={({ field }) => (
                <Textarea
                  className="mt-2"
                  label="Descripcion del producto"
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />

            <Controller
              control={control}
              name="category"
              rules={{ required: true }}
              render={({ field }) => (
                <select
                  className="w-full p-3 mt-2 bg-gray-800 rounded-md"
                  onChange={field.onChange}
                  value={field.value}
                >
                  <option value="men's clothing">Men's clothing</option>
                  <option value="women's clothing">Women's clothing</option>
                  <option value="jewelery">Jewelery</option>
                  <option value="electronics">Electronics</option>
                </select>
              )}
            />
            <br />
            <Button
              className="mt-2"
              color="primary"
              type="submit"
              isDisabled={productMutation.isPending}
            >
              {productMutation.isPending ? "Creando..." : "Crear"}
            </Button>
          </div>

          <div
            className="flex items-center p-10 bg-white rounded-2xl"
            style={{
              width: "500px",
              height: "600px",
            }}
          >
            <Image src="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg" />
          </div>
        </div>
      </form>
    </div>
  );
};
