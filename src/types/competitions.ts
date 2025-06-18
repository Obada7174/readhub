import { Book } from "./book";
import { Meta } from "./index";
export type Quiz = {
  id: number;
  title: string;
  ar_title: string;
  book: Book;
  questions: Question[];
};

export interface Question {
  id: number;
  bookId: number;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  updated_at: string;
  quiz: Quiz;
  translations: Translation[];
}

export interface QuestionAnswer {
  id: number;
  isCorrect: boolean;
  user: {
    id: number;
    first_name: string;
    last_name: string;
  };
  question: {
    id: number;
    question_text: string;
  };
}

export interface Translation {
  id: number;
  lang: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  updated_at: string;
}
export interface QuestionIndexResponse {
  data: Question[];
  meta: Meta;
}
export interface QuizIndexResponse {
  data: Quiz[];
  meta: Meta;
}

export interface QuestionAnswerResponse {
  data: QuestionAnswer[];
  meta: Meta;
}
