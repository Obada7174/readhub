import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@/hooks/userContext";

interface Comment {
  id: number;
  text: string;
  title: string;
  created_at: string;
  updated_at: string;
  likesCount: number;
  repliesCount: number;
  book: {
    title: string;
    ar_title?: string;
  };
}

export const useUserComments = () => {
  const { user } = useUser();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:5000/comments/user/${user.id}`);
        setComments(res.data.data || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [user]);

  return { comments, loading };
};
