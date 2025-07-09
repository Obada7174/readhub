'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

import {
  MdOutlineAlternateEmail,
  MdJoinRight,
  MdVerifiedUser,
  MdModeEditOutline
} from 'react-icons/md';
import { IoLocation } from 'react-icons/io5';
import { BiUserCheck } from 'react-icons/bi';
import { useUserProfile } from '@/hooks/profile/useUserProfile';
import ProfileCard from '@/components/panel/profilecard';
import InfoItem from '@/components/panel/infoItemprofile';

export default function UserProfilePage() {
  const t = useTranslations('Panel.UserProfile');
  const { user, imageUrl, goToEditProfile } = useUserProfile();

  if (!user) {
    return <div className="text-center p-10 text-gray-500 dark:text-gray-400">{t('loading')}</div>;
  }

  return (
    <div className="w-full max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 md:p-12 mt-14">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-10 flex items-center gap-3">
        {t('accountInfo')}
      </h1>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
        <ProfileCard user={user} imageUrl={imageUrl} onEditClick={goToEditProfile} t={t} />

        <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InfoItem label={t('email')} icon={<MdOutlineAlternateEmail />} value={user.email ?? ''} />
          <InfoItem label={t('location')} icon={<IoLocation />} value={user.location ?? t('notSet')} />
          <InfoItem label={t('role')} icon={<BiUserCheck />} value={user.role ?? ''} />
          <InfoItem
  label={t('joinedAt')}
  icon={<MdJoinRight />}
  value={user.created_at ? new Date(user.created_at).toLocaleDateString() : t('unknown')}
/>
<InfoItem
  label={t('lastLogin')}
  icon={<MdVerifiedUser />}
  value={user.last_login_at ? new Date(user.last_login_at).toLocaleString() : t('unknown')}
/>
<InfoItem
  label={t('lastUpdated')}
  icon={<MdModeEditOutline />}
  value={user.updated_at ? new Date(user.updated_at).toLocaleString() : t('notUpdatedYet')}
/>
<InfoItem
  label={t('verified')}
  icon={<MdVerifiedUser />}
  value={user.isVerified ? t('yes') : t('no')}
/>
<InfoItem
  label={t('subscribed')}
  icon={<MdOutlineAlternateEmail />}
  value={user.isSubscribed ? t('yes') : t('no')}
/>
        </div>
      </div>
    </div>
  );
}
