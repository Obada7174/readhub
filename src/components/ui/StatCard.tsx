"use client";

import { Card } from "@/components/ui/card";
import { IconType } from "react-icons";
import { motion } from "framer-motion";

type StatCardProps = {
  title: string;
  value: number;
  icon: IconType;
  color: string;
};

const MotionCard = motion(Card);

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color }) => {
  return (
    <MotionCard
      className="rounded-2xl bg-white/80 backdrop-blur-md shadow-md border border-gray-200 hover:shadow-xl transition relative overflow-hidden"
      whileHover={{ scale: 1.05, rotate: 0.5 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* خلفية متدرجة خفيفة في الأعلى */}
      <div className={`absolute top-0 left-0 w-full h-2 ${color}`} />

      <div className="p-6 flex items-center gap-5">
        <div
          className={`p-4 rounded-2xl flex items-center justify-center text-white shadow-md ${color}`}
        >
          <Icon size={28} />
        </div>
        <div>
          <h3 className="text-sm text-gray-500 font-medium">{title}</h3>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </MotionCard>
  );
};

export default StatCard;
