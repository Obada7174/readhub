import axios from "@/services/axios";
import {Question ,QuestionIndexResponse} from "@/types/competitions";

export const getQuestions = async (page = 1, limit = 10, lang = 'en'): Promise<QuestionIndexResponse> => {
  const res = await axios.get("/book-questions/paginated", {
    params: { page, limit, lang }
  });
  return res.data;
};
export const getQuestion = async (id: number): Promise<Question> => {
  const res = await axios.get(`/book-questions/${id}`);
  return res.data;
};

export const createQuestion = async (user: Omit<Question, "id">): Promise<Question> => {
  const res = await axios.post("/book-questions", user);
  return res.data;
};

export const updateQuestion = async (
  id: number,
  payload: Question
): Promise<Question> => {
  const res = await axios.patch(`/book-questions/${id}`, payload);
  return res.data;
};

export const deleteQuestions = async (ids: number[]): Promise<void> => {
  await axios.delete(`/book-questions`, {
    data: { ids },
  });
};

