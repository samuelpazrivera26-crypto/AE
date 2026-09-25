export type ProductCategory = "outerwear" | "streetwear" | "hardware";

export type ProductStatus = "visible" | "upcoming" | "soldout";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  tag: string;
  description: string;
  priceBaseEUR: number;
  image: string;
  hasSizes: boolean;
  sizes: string[];
  stock: number;
  status: ProductStatus;
  updatedAt: number;
}

export type Currency = "EUR" | "USD" | "COP";

export interface CartLine {
  productId: string;
  size: string | null;
  quantity: number;
}
