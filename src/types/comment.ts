export interface CommentUser {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  role?: string;
}

export interface CommentBook {
  id?: number;
  title: string;
  ar_title?: string;
}

export interface Comment {
  id: number;
  text: string;
  title?: string;
  created_at: string;
  updated_at: string;
  likesCount?: number;
  repliesCount?: number;
  user: CommentUser;
  book: CommentBook;
}

export interface CommentsResponse {
  data: Comment[];
  meta: {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
  };
  links?: {
    first: string;
    last: string;
    next?: string;
  };
}

export interface CommentBody {
  title?: string;
  text: string;
  userId: number;
  bookId: number;
}
export interface BookCommentsResponse {
  id: number;
  title: string;
  comments: BookComment[];
}

export interface BookComment {
  id: number;
  text: string;
  created_at: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    img: string;
  };
  likes: {
    id: number;
    user: {
      id: number;
      first_name: string;
      last_name: string;
    };
  }[];
  replies: any[]; 
}
