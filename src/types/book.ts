import { Category } from "./category";
export interface Book {
  id: number;
  title: string;
  ar_title: string;
  description: string;
  ar_description: string;
  img: string;
  author: string;
  price: string;
  discount: string;
  discounted_price: string;
  pdf: string;
  rating: string;
  rating_count: number;
  total_pages: number;
  total_ratings: number;
  created_at: string;
  categories: Category[];
}
