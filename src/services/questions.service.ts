import { QuestionAnswerFormValues } from "@/lib/validators/question-answer.validator";
import axios from "@/services/axios";
import {
  Question,
  QuestionAnswerResponse,
  QuestionIndexResponse,
} from "@/types/competitions";

export const getQuestions = async (
  page = 1,
  limit = 10,
  lang = "en"
): Promise<QuestionIndexResponse> => {
  const res = await axios.get("/book-questions/paginated", {
    params: { page, limit, lang },
  });
  return res.data;
};
export const getQuestion = async (id: number): Promise<Question> => {
  const res = await axios.get(`/book-questions/${id}`);
  return res.data;
};

export const createQuestion = async (
  user: Omit<Question, "id">
): Promise<Question> => {
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

export const getQuestionsAnswers = async (
  page = 1,
  limit = 10,
  search = ""
): Promise<QuestionAnswerResponse> => {
  const res = await axios.get("http://localhost:5000/question-answers", {
    params: { page, limit, search },
  });
  return res.data;
};
export const getQuestionAnswer = async (id: string) => {
  const res = await axios.get(`http://127.0.0.1:5000/question-answers/${id}`);
  return res.data;
};

export const createQuestionAnswer = async ({
  isCorrect,
  selected_option,
  questionId,
  userId,
}: QuestionAnswerFormValues) => {
  const res = await axios.post("http://127.0.0.1:5000/question-answers", {
    isCorrect,
    selected_option,
    userId,
    questionId,
  });
  return res.data;
};

export const updateQuestionAnswer = async ({
  id,
  isCorrect,
  selected_option,
  questionId,
  userId,
}: {
  id: string;
} & QuestionAnswerFormValues) => {
  const res = await axios.patch(
    `http://127.0.0.1:5000/question-answers/${id}`,
    {
      isCorrect,
      selected_option,
      questionId,
      userId,
    }
  );
  return res.data;
};

export const deleteQuestionsAnswers = async (ids: number[]): Promise<void> => {
  await axios.delete(`http://localhost:5000/question-answers`, {
    data: { ids },
  });
};
