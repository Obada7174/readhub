// // hooks/react-query/faqs/useUpdateFaq.ts

// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";

// export const useUpdateFaq = () => {
//   return useMutation({
//     mutationFn: async ({
//       id,
//       enQuestion,
//       arQuestion,
//       enAnswer,
//       arAnswer,
//       isPublished,
//     }: {
//       id: number;
//       enQuestion: string;
//       arQuestion: string;
//       enAnswer: string;
//       arAnswer: string;
//       isPublished: "active" | "inactive";
//     }) => {
//       const res = await axios.put(
//         `http://127.0.0.1:5000/faqs/${id}`,
//         {
//           enQuestion,
//           arQuestion,
//           enAnswer,
//           arAnswer,
//           isPublished,
//         }
//       );
//       console.log("API Response:", res.data); 
//       return res.data;
//     },
//     onError: (err) => {
//       console.error("Mutation Error:", err);
//     },
//   });
// };