export type CartItem = {
  id: number;
  quantity: number;
};

export type Cart = {
  id: number;
  status: string; 
  user: {
    id: number;
    email: string; 
  };
  created_at: string;
  updated_at: string;
  items?: CartItem[]; 
};