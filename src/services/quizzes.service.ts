import axios from "@/services/axios";
import {Quiz ,QuizIndexResponse,CreateQuiz} from "@/types/competitions";

export const getQuizzes = async (page = 1, limit = 10, lang = 'en'): Promise<QuizIndexResponse> => {
  const res = await axios.get("/quizzes", {
    params: { page, limit, lang }
  });
  return res.data;
};
export const getQuiz = async (id: number): Promise<Quiz> => {
  const res = await axios.get(`/quizzes/${id}`);
  return res.data;
};

export const createQuiz = async (quiz: Omit<CreateQuiz, "id">): Promise<CreateQuiz> => {
  const res = await axios.post("/quizzes", quiz);
  return res.data;
};

export const updateQuiz = async (
  id: number,
  payload: Quiz
): Promise<Quiz> => {
  const res = await axios.patch(`/quizzes/${id}`, payload);
  return res.data;
};

export const deleteQuizzes = async (ids: number[]): Promise<void> => {
  await axios.delete(`/quizzes`, {
    data: { ids },
  });
};

