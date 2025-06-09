// hooks/react-query/faqs/useFaqQuery.ts

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Faq {
  id: number;
  enQuestion: string;
  arQuestion: string;
  enAnswer: string;
  arAnswer: string;
  isPublished: "active" | "inactive";
}

const fetchFaqById = async (id: number): Promise<Faq> => {
  const response = await axios.get(`http://127.0.0.1:5000/faqs/${id}`);
  return {
    id: response.data.id,
    enQuestion: response.data.enQuestion || "",
    arQuestion: response.data.arQuestion || "",
    enAnswer: response.data.enAnswer || "",
    arAnswer: response.data.arAnswer || "",
    isPublished: response.data.isPublished || "inactive",
  };
};

export const useFaqQuery = (id: number) => {
  return useQuery({
    queryKey: ["faq", id],
    queryFn: () => fetchFaqById(id),
  });
};