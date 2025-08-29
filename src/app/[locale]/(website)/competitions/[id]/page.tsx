"use client";

import { useQuizQuery } from "@/hooks/react-query/quizzes/useQuizzesQuery";
import { useParams } from "next/navigation";
import { useState } from "react";

const SingleQuizPage = () => {
  const params = useParams();
  const quizId = Number(params.id);

  const { data: quiz, isLoading } = useQuizQuery(quizId);

  // حالة الامتحان
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});

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
  console.log(quiz)
  const questions = quiz.questions || [];
  const currentQuestion = questions[currentQuestionIndex];

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const nextButtonDisabled = selectedAnswer === null;

  const handleNext = () => {
    if (selectedAnswer) {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: selectedAnswer,
      }));
    }
    setSelectedAnswer(null);
    if (!isLastQuestion) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prev) => prev - 1);
    const prevAnswer = answers[questions[currentQuestionIndex - 1]?.id];
    setSelectedAnswer(prevAnswer || null);
  };

  const handleSubmit = () => {
    console.log("User answers:", answers);
    // تقدر تبعت الإجابات للباك اند هنا
    alert("Quiz submitted! ✅ Check console for answers.");
  };

  return (
    <>
      <title>{quiz.title}</title>
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          {/* Header */}
          <header className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Book: {quiz.book?.title ?? "Unknown"}
            </p>
          </header>

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
              <h2 className="text-xl font-bold mb-4">
                {currentQuestion.question_text}
              </h2>
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
        </div>
      </div>
    </>
  );
};

export default SingleQuizPage;
