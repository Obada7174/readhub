'use client'

import { useTranslations } from 'next-intl';
import PlanCard from "@/components/supscription/planCard";
import { Plan } from "@/types/subscription";

const SubscriptionPage = () => {
  const t = useTranslations("subscription");

  const plans: Plan[] = [
    {
      id: "basic",
      title: t("basic.title"),
      price: t("basic.price"),
      features: [
        t("basic.feature1"),
        t("basic.feature2"),
        t("basic.feature3"),
        t("basic.feature4"),
      ],
    },
    {
      id: "standard", // monthly
      title: t("standard.title"),
      price: t("standard.price"),
      features: [
        t("standard.feature1"),
        t("standard.feature2"),
        t("standard.feature3"),
        t("standard.feature4"),
      ],
    },
    {
      id: "premium", // yearly
      title: t("premium.title"),
      price: t("premium.price"),
      features: [
        t("premium.feature1"),
        t("premium.feature2"),
        t("premium.feature3"),
        t("premium.feature4"),
        t("premium.feature5"),
        t("premium.feature6"),
      ],
    },
  ];

  const handlePlanSelect = async (planId: string) => {
    let planType = "";

    if (planId === "standard") {
      planType = "monthly";
    } else if (planId === "premium") {
      planType = "yearly";
    } else {
      alert("This plan is free or not supported yet.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/payment/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan: planType }),
      });

      const data = await response.json();

      if (data?.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to get redirect URL");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-[80vh] p-6 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <header className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t("title")}</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-xl mx-auto">
          {t("description")}
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-6 justify-center w-full max-w-6xl px-4">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} onSelect={handlePlanSelect} />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPage;
