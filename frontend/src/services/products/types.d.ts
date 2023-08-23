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

export type Category = {
  id: number;
  title: string;
  subCategories: { id: number; title: string }[];
};
