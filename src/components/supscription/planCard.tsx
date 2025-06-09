import React from "react";
import { Plan } from "@/types/subscription";

type Props = {
  plan: Plan;
};

const PlanCard: React.FC<Props> = ({ plan }) => {
  return (
    <div
      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-md p-6 w-full md:w-80 flex flex-col justify-between min-h-[400px] 
      transition-all duration-300 hover:scale-105 hover:shadow-xl transform-gpu relative overflow-hidden group"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-transparent to-purple-50 dark:from-blue-900 dark:to-purple-900 opacity-30 
        group-hover:opacity-50 transition-opacity duration-500 pointer-events-none animate-pulse"></div>

      <div className="relative z-10">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{plan.title}</h2>
        <p className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400">
          {plan.price}
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
          {plan.features.map((feature, index) => (
            <li key={index} className="mb-1">
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <button className="mt-auto w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors transform-gpu group-hover:translate-y-[-2px]">
        {plan.title.includes("Basic") ? "Select Free Plan" : `Select ${plan.title}`}
      </button>
    </div>
  );
};

export default PlanCard;