export interface Category {
  id: number;
  title: string;
  ar_title: string | null;
}

export interface CategoriesResponse {
  data: Category[];
  meta: { total: number; page: number; limit: number; total_pages: number };
}
