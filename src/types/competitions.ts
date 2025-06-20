import { Book } from "./book";
import { Meta } from "./index";
export type Quiz = {
  id: number;
  title: string;
  ar_title: string;
  book: Book;
  questions: Question[];
};
export type CreateQuiz = {
    title: string;
    ar_title: string;
    bookId:number;
};

export interface QuestionFormValues {
  bookId?: number;
  quizId?: number;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;

  ar_question_text: string;
  ar_option_a: string;
  ar_option_b: string;
  ar_option_c: string;
  ar_option_d: string;
}

export interface QuestionPayload {
  bookId: number | undefined;
  quizId?: number | undefined;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  translations: {
      lang: string;
      question_text: string;
      option_a: string;
      option_b: string;
      option_c: string;
      option_d: string;
  }[];
}

export type QuizOption = {
  id:number,
  title:{
    en:string,
    ar:string
  }
}
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
