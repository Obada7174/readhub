// hooks/react-query/faqs/useFaqsQuery.ts

import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

// Types
export interface Faq {
  id: number;
  question: string;
  answer: string;
  status: 'active' | 'inactive';
}

// Fetch all FAQs
const fetchFaqs = async (
  page: number,
  limit: number,
  lang: string,
  status?: string,
  search?: string
): Promise<{ data: Faq[]; total: number }> => {
  const response = await axios.get('http://127.0.0.1:5000/faqs', {
    params: {
      lang,
      status,
    },
  });

  // تحويل البيانات لتتناسب مع الهيكلية الجديدة
  const adaptedData = response.data.map((item: { id: any; question: any; answer: any; status: any; }) => ({
    id: item.id,
    question: item.question,
    answer: item.answer,
    status: item.status,
  }));

  const total = parseInt(response.headers['x-total-count'] || '0');
  return {
    data: adaptedData,
    total,
  };
};

// Fetch single FAQ by ID
const fetchFaqById = async (id: number, lang: string): Promise<Faq> => {
  const response = await axios.get(`http://127.0.0.1:5000/faqs/${id}`, {
    params: { lang },
  });

  return {
    id: response.data.id,
    question: response.data.question,
    answer: response.data.answer,
    status: response.data.status,
  };
};


const createFaq = async (faqData: {
  enQuestion: string;
  arQuestion: string;
  enAnswer: string;
  arAnswer: string;
  isPublished: boolean;
}) => {
  const response = await axios.post('http://127.0.0.1:5000/faqs', faqData);
  return response.data;
};

// Update existing FAQ
const updateFaq = async (faqData: {
  id: number;
  question: string;
  answer: string;
  status: 'active' | 'inactive';
}) => {
  const response = await axios.put(
    `http://127.0.0.1:5000/faqs/${faqData.id}`,
    faqData
  );
  return response.data;
};

// Delete multiple FAQs
const deleteFaqs = async (ids: number[]) => {
  await axios.delete('http://127.0.0.1:5000/faqs', {
    data: { ids },
  });
};

// Main Hook that returns all queries and mutations
export const useFaqsQuery = (
  page: number,
  limit: number,
  lang: string,
  status?: string,
  search?: string
) => {
  const {
    data,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ['faqs', page, limit, lang, status, search],
    queryFn: () => fetchFaqs(page, limit, lang, status, search),
  });

  const getFaqById = useQuery({
    queryKey: ['faq', lang],
    queryFn: () => fetchFaqById(1, lang),
    enabled: false,
  });

  const createMutation = useMutation({
    mutationFn: createFaq,
  });

  const updateMutation = useMutation({
    mutationFn: updateFaq,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFaqs,
  });
  return {
    faqs: data?.data || [],
    total: data?.total || 0,
    isLoading,
    error,
    refetchFaqs: refetch,
  
    getFaqById,
  
    createFaq: createMutation.mutateAsync,
    updateFaq: updateMutation.mutateAsync,
    deleteFaqs: deleteMutation.mutateAsync,
  
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};