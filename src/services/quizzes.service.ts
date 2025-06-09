import axios from "@/services/axios";
import { Quiz, QuizIndexResponse } from "@/types/competitions";

export const getQuizzes = async (
  page = 1,
  limit = 10,
  lang = "en"
): Promise<QuizIndexResponse> => {
  const res = await axios.get("/quizzes", {
    params: { page, limit, lang },
  });
  return res.data;
};
export const getQuiz = async (id: number): Promise<Quiz> => {
  const res = await axios.get(`/quizzes/${id}`);
  return res.data;
};

export const createQuiz = async (quiz: Omit<Quiz, "id">): Promise<Quiz> => {
  const res = await axios.post("/quizzes", quiz);
  return res.data;
};

export const updateQuiz = async (id: number, payload: Quiz): Promise<Quiz> => {
  const res = await axios.patch(`/quizzes/${id}`, payload);
  return res.data;
};

export const deleteQuizzes = async (ids: number[]): Promise<void> => {
  await axios.delete(`/quizzes`, {
    data: { ids },
  });
};

export const getQuizzesWinners = async (
  page: number,
  limit: number,
  search: string
): Promise<QuizIndexResponse> => {
  const res = await axios.get("http://localhost:5000/quiz-winners", {
    params: { page, limit, search },
  });
  return res.data;
};

export const getQuizWinner = async (id: string) => {
  const res = await axios.get("http://localhost:5000/quiz-winners/" + id);
  return res.data;
};

export const updateQuizWinner = async (
  id: number,
  userId: number,
  coupon: number
) => {
  const res = await axios.patch(`http://localhost:5000/quiz-winners/${id}`, {
    userId,
    coupon,
  });
  return res.data;
};

export const deleteQuizWinner = async (ids: number[]): Promise<void> => {
  await axios.delete("http://localhost:5000/quiz-winners", {
    data: { ids },
  });
};

export const getQuizzesResults = async (
  page: number,
  limit: number,
  search: string
): Promise<QuizIndexResponse> => {
  const res = await axios.get("http://localhost:5000/quiz-results", {
    params: { page, limit, search },
  });
  return res.data;
};

export const getQuizResult = async (id: string) => {
  const res = await axios.get("http://localhost:5000/quiz-results/" + id);
  return res.data;
};

export const createQuizResult = async (
  quizId: string,
  userId: string,
  total_questions: string,
  total_correct: string
) => {
  const res = await axios.post("http://localhost:5000/quiz-results", {
    quizId,
    userId,
    total_questions,
    total_correct,
  });
  return res.data;
};

export const updateQuizResult = async (
  id: string,
  quizId: string,
  userId: string,
  total_questions: string,
  total_correct: string
) => {
  const res = await axios.patch(`http://localhost:5000/quiz-results/${id}`, {
    quizId,
    userId,
    total_questions,
    total_correct,
  });
  return res.data;
};

export const deleteQuizResult = async (ids: number[]): Promise<void> => {
  await axios.delete("http://localhost:5000/quiz-results", {
    data: { ids },
  });
};
