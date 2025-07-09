// ✅ hooks/useUserProfile.ts (نسخة تعتمد على API)

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/userContext';
import axios from 'axios';

export function useUserProfile() {
  const router = useRouter();
  const { user: storedUser } = useUser();
  const [user, setUser] = useState<any | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!storedUser?.id) return;
        const token = storedUser.token;
        const baseURL = 'http://localhost:5000';

        const res = await axios.get(`${baseURL}/users/${storedUser.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fetchedUser = res.data;
        setUser(fetchedUser);

        const image = fetchedUser.img;
        if (image?.startsWith('http')) {
          setImageUrl(image);
        } else if (image?.startsWith('/')) {
          setImageUrl(baseURL + image);
        } else {
          setImageUrl(baseURL + '/uploads/users/' + image);
        }
      } catch (err) {
        console.error('❌ فشل في جلب بيانات المستخدم من API', err);
        setUser(null);
      }
    };

    fetchUser();
  }, [storedUser]);

  const goToEditProfile = () => {
    router.push('profile/edit');
  };

  return {
    user,
    imageUrl,
    goToEditProfile,
  };
}
