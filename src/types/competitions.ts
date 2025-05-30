import { Book } from "./book";

export type Question = {
    id: number;
    bookId: number;
    question_text: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_option: 'a' | 'b' | 'c' | 'd';
    updated_at: string;  
  };
  
export  type Quiz = {
    id: number;
    title: string;
    ar_title: string;
    book: Book;          
    questions: Question[];
  };
  