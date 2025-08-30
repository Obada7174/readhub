"use client";

import { useCreateCoupon } from "@/hooks/react-query/coupons/usequerycoupons";
import { useCreateQuestionAnswer } from "@/hooks/react-query/questions/useQuestionsQuery";
import { useCreateQuizWinner, useQuizQuery } from "@/hooks/react-query/quizzes/useQuizzesQuery";
import { Question } from "@/types/competitions";
import { useParams } from "next/navigation";
import { useState } from "react";

const SingleQuizPage = () => {
  const params = useParams();
  const quizId = Number(params.id);

  const { data: quiz, isLoading } = useQuizQuery(quizId);

  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const { mutate: coupon } = useCreateCoupon();
  const { mutate: winner } = useCreateQuizWinner();
  const { mutate } = useCreateQuestionAnswer();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading quiz...
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Quiz not found
      </div>
    );
  }

  const questions = quiz.questions || [];
  const currentQuestion = questions[currentQuestionIndex];

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const nextButtonDisabled = selectedAnswer === null;

  const handleNext = () => {
    if (selectedAnswer) {
      // تحديث state وإرسال الإجابة الأخيرة إذا كانت آخر سؤال
      const updatedAnswers = {
        ...answers,
        [currentQuestion.id]: selectedAnswer,
      };
      setAnswers(updatedAnswers);

      if (!isLastQuestion) {
        setSelectedAnswer(null);
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        handleSubmit(updatedAnswers); // استخدم الـ updatedAnswers مباشرة
      }
    }
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prev) => prev - 1);
    const prevAnswer = answers[questions[currentQuestionIndex - 1]?.id];
    setSelectedAnswer(prevAnswer || null);
  };

  // دالة لتوليد كود كوبون عشوائي
  const generateRandomCoupon = (length = 12) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // مثال استخدامه في handleSubmit
  const handleSubmit = async (finalAnswers?: Record<number, string>) => {
    const allAnswers = finalAnswers || answers;
    try {
      let correct = 0;

      await Promise.all(
        Object.entries(allAnswers).map(async ([questionId, selected_option]) => {
          const question = questions.find((q) => q.id === Number(questionId));
          console.log(question)
          if (question) {
            const correctKey = `option_${question.correct_option}` as keyof Question;
            const isCorrect = question[correctKey] === selected_option ? 1 : 0;
            if (isCorrect) correct++;

            return mutate({
              selected_option,
              isCorrect,
              questionId: Number(questionId),
              userId: user.id,
            });
          }
        })
      );

      setCorrectCount(correct);
      setQuizSubmitted(true);

      if (correct === questions.length) {
        const randomCode = generateRandomCoupon(16);

        // إنشاء الكوبون عبر callback onSuccess
        coupon(
          { coupon: randomCode, value: 10 },
          {
            onSuccess: async (data) => {
              // data هنا يحتوي على معرف الكوبون وكافة المعلومات
              const newCouponId = data.id;

              // تسجيل فوز الكويز
              await winner({ id: quizId, userId: user.id, coupon: newCouponId });

              // عرض الكوبون للمستخدم
              alert(`🎉 Congratulations! You got all answers correct. Your coupon code: ${data.id}`);
            },
            onError: (err) => {
              console.error("❌ Failed to create coupon:", err);
            },
          }
        );
      }
    } catch (error) {
      console.error("❌ Failed to submit quiz answers:", error);
    }
  };



  return (
    <>
      <title>{quiz.title}</title>
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <header className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Book: {quiz.book?.title ?? "Unknown"}
            </p>
          </header>

          {!quizSubmitted ? (
            <>
              {/* Progress Bar */}
              <div className="mb-6">
                <p className="text-sm mb-2">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
                <div className="w-full bg-gray-600 rounded-full overflow-hidden h-2">
                  <div
                    className="bg-blue-500 h-full"
                    style={{
                      width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Current Question */}
              {currentQuestion && (
                <section className="mb-6">
                  <h2 className="text-xl font-bold mb-4">{currentQuestion.question_text}</h2>
                  <form>
                    {[currentQuestion.option_a, currentQuestion.option_b, currentQuestion.option_c, currentQuestion.option_d].map(
                      (option, index) => (
                        <label
                          key={index}
                          className={`flex items-center space-x-2 py-2 px-4 rounded-lg border mb-2 cursor-pointer transition-colors ${selectedAnswer === option
                            ? "border-blue-500 bg-blue-100 dark:bg-blue-900"
                            : "border-gray-600"
                            }`}
                          onClick={() => setSelectedAnswer(option)}
                        >
                          <input
                            type="radio"
                            name="answer"
                            value={option}
                            checked={selectedAnswer === option}
                            onChange={() => setSelectedAnswer(option)}
                            className="cursor-pointer"
                          />
                          <span>{option}</span>
                        </label>
                      )
                    )}
                  </form>
                </section>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                {!isFirstQuestion && (
                  <button
                    onClick={handlePrevious}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Previous
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                  disabled={nextButtonDisabled}
                >
                  {isLastQuestion ? "Submit Quiz" : "Next"}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-10">
              <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
              <p className="text-lg">
                You answered {correctCount} / {questions.length} questions correctly ✅
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleQuizPage;
