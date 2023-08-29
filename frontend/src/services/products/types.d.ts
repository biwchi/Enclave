export type Product = {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  price: number;
  rating: number;
  reviewCount: number;
  category: Category;
  updated_at: Date;
  create_at: Date;
  subCategory: SubCategory;
};

export type Review = {
  id: string;
  rating: number;
  review?: string;
  product: Product;
  user: {
    id: string;
    email: string;
  };
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
  subCategories: SubCategory[];
};

export type SubCategory = { id: number; title: string; totalProducts: number };
