'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@/hooks/userContext';

export interface Favorite {
  id: number;
  book: {
    id: number;
    title: string;
    ar_title: string;
    img: string;
    author: string;
    price: string;
    rating: string;
    total_pages: number;
    discounted_price?: string;
    discount?: string;
    description?: string;
    categories?: { id: number; title: string }[];
  };
}

export function useFavoriteBooks() {
  const { user } = useUser();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      axios
        .get(`http://127.0.0.1:5000/favorite/user/${user.id}`)
        .then((res) => setFavorites(res.data.data))
        .catch((err) => console.error('❌ Failed to fetch favorites:', err))
        .finally(() => setLoading(false));
    }
  }, [user?.id]);

  const removeFavorite = async (favoriteId: number) => {
    try {
      await axios.delete(`http://localhost:5000/favorite/${favoriteId}`);
      setFavorites((prev) => prev.filter((f) => f.id !== favoriteId));
    } catch (err) {
      console.error('❌ Failed to remove favorite:', err);
    }
  };

  return { favorites, loading, removeFavorite };
}
