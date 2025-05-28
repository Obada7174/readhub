export interface User {
    id: number;
    first_name: string;
    last_name: string;
    location: string;
    role: string;
    email: string;
    password: string;
    img: string;
    token: string | null;
    last_login_at: string;
    created_at: string;
}

export interface UpdateUserPayload {
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    location: string;
}

export type UsersResponse= {
    data: User[];
    total:number;
    totalPages:number;
    currentPage:string;
  }