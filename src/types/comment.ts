import { User } from "./user";

export interface Like {
  id: number;
  user: User;
}

export interface ReplyBody {
  text: string;
  userId: number;
  comment: number;
}

export interface Reply {
  id: number;
  user: User;
  text: string;
  created_at: string;
}

export interface CommentBody {
  title: string;
  text: string;
  userId: number;
  bookId: number;
}

export interface Comment {
  id: number;
  user: User;
  text: string;
  created_at: string;
  replies: Reply[];
  likes: Like[];
}
