import { Category } from "./category";
export interface Book {
  id: number;
  title: string;
  description: string;
  img: string;
  author: string;
  price: string;
  discount: string;
  pdf: string;
  rating: string;
  rating_count: number;
  total_pages: number;
  total_ratings: number;
  created_at: string;
  categories: Category[];
  }

  
export interface ApiResponse {
  data: Book[];
  meta: { total: number; page: number; limit: number; total_pages: number };
}

export interface CategoryOption {
  id: number;
  title: string;
}