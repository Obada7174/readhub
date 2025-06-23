"use client";

import React from "react";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import { MdVerifiedUser, MdJoinRight } from "react-icons/md";
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";

type User = {
  id: number;
  first_name: string;
  last_name: string;
  location: string;
  role: string;
  email: string;
  img: string;
  created_at: string;
  last_login_at: string;
  isVerified: boolean;
  isSubscribed: boolean;
  subscriptionType?: string | null;
  subscriptionEndsAt?: string | null;
};

const mockUser: User = {
  id: 1,
  first_name: "Johne",
  last_name: "Doe",
  location: "New York",
  role: "user",
  email: "john.doe@example.com",
  img: "https://randomuser.me/api/portraits/men/1.jpg",
  created_at: "2023-01-15T06:00:00.000Z",
  last_login_at: "2023-05-18T11:30:00.000Z",
  isVerified: true,
  isSubscribed: false,
};

export default function UserProfilePage() {
  const user = mockUser;

  return (
    <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-10 mt-10">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 border-b pb-4 flex items-center gap-2">
        <FaUserCircle className="text-blue-600" size={28} />
        Account Information
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Column: Image and Edit */}
        <div className="flex flex-col items-center">
          <img
            src={user.img}
            alt={`${user.first_name} ${user.last_name}`}
            className="w-40 h-40 rounded-full border-4 border-blue-500 shadow-lg object-cover"
          />
          <h2 className="text-xl font-semibold mt-4 text-gray-800 dark:text-white">
            {user.first_name} {user.last_name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user.role}
          </p>
          <button className="flex items-center mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-pointer">
  <MdModeEditOutline className="mr-2" size={20} />
  Edit Profile
</button>

        </div>

        {/* Right Column: Info */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InfoItem
            label="Email"
            icon={<MdOutlineAlternateEmail className="text-lg" />}
            value={user.email}
          />
          <InfoItem
            label="Location"
            icon={<IoLocation className="text-lg" />}
            value={user.location}
          />
          <InfoItem
            label="Verified"
            icon={<MdVerifiedUser className="text-lg" />}
            value={user.isVerified ? "Yes" : "No"}
          />
          <InfoItem
            label="Joined"
            icon={<MdJoinRight className="text-lg" />}
            value={new Date(user.created_at).toLocaleDateString()}
          />
          <InfoItem
            label="Subscription"
            icon={
              user.isSubscribed ? (
                <FaRegCheckCircle className="text-green-600" />
              ) : (
                <FaRegTimesCircle className="text-red-500" />
              )
            }
            value={
              user.isSubscribed
                ? `Yes (${user.subscriptionType}) until ${new Date(
                    user.subscriptionEndsAt!
                  ).toLocaleDateString()}`
                : "No"
            }
          />
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm border dark:border-gray-700">
      <p className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-2 mb-1">
        {icon} {label}
      </p>
      <p className="text-md font-medium text-gray-800 dark:text-white">
        {value}
      </p>
    </div>
  );
}
