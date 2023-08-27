export type Product = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  category: Category;
  updated_at: Date;
  create_at: Date;
};

export type CreateProduct = {
  title: string;
  description: string;
  price: number;
  category:
    | {
        title: string;
        value: number;
      }
    | number;
  imageUrl: string;
};

export type Category = {
  id: number;
  title: string;
  totalProducts: number;
  subCategories: { id: number; title: string; totalProducts: number }[];
};
