"use client";

import StatCard from "@/components/ui/StatCard";
import {
  FaBook,
  FaShoppingCart,
  FaUsers,
  FaTrophy,
  FaClipboardList,
  FaTicketAlt,
} from "react-icons/fa";
import { IconType } from "react-icons";

type Stat = {
  title: string;
  value: number;
  icon: IconType;
  color: string;
};

const page = () => {
  const stats: Stat[] = [
    { title: "عدد الكتب", value: 120, icon: FaBook, color: "bg-blue-500" },
    { title: "عدد السلات المباعة", value: 85, icon: FaShoppingCart, color: "bg-green-500" },
    { title: "عدد المستخدمين", value: 450, icon: FaUsers, color: "bg-purple-500" },
    { title: "عدد المسابقات", value: 12, icon: FaTrophy, color: "bg-orange-500" },
    { title: "عدد الخطط", value: 6, icon: FaClipboardList, color: "bg-pink-500" },
    { title: "عدد الكوبونات", value: 34, icon: FaTicketAlt, color: "bg-red-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default page;
