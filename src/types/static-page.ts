export interface Page {
  id: number,
  en_title: string,
  en_content: string,
  ar_title: string,
  ar_content: string,
  url: string,
  is_published: boolean,
  createdAt: string,
  updatedAt: string
}

export type PageResponse = {
  data: Page[];
  count:number
  total: number;
  totalPages: number;
  currentPage: string;
};

export type AddPageFormValues = {
  en_title: string,
  en_content: string,
  ar_title: string,
  ar_content: string,
  url: string,
  is_published: boolean
};

export type UpdatePagePayload = AddPageFormValues;

export type EditUserFormValues = {
  first_name: string;
  last_name: string;
  email: string;
  location: string;
  password: string;
  role: string;
};
