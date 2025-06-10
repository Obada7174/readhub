export interface QuizWinner {
  quiz: {
    id: string;
  };
  user: {
    id: string;
  };
  coupon: {
    id: string;
  };
}

export interface QuizResult {
  quiz: {
    id: string;
  };
  user: {
    id: string;
  };
  total_questions: string;
  total_correct: string;
}
