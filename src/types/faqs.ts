export type UpdateFaqPayload = {
  enQuestion: string;
  arQuestion: string;
  enAnswer: string;
  arAnswer: string;
  isPublished: "active" | "inactive";
};

export type Faq = {
  id: number;
} & UpdateFaqPayload;