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
  // export interface BookAuthor {
  //   id: number;
  //   title: string;
  //   description: string;
  //   image: string;
  //   price: string;
  //   rating: number;
  //   publishedDate: string;
  // }
  
  