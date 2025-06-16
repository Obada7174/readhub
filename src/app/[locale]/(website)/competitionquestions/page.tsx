"use client";

import { useState } from "react";

const QuizPage = () => {
  
    const questions = [
    {
      id: 1,
      question: "Which novel by Harper Lee explores themes of racial injustice and childhood innocence in the American South?",
      options: ["The Catcher in the Rye", "To Kill a Mockingbird", "The Great Gatsby", "Pride and Prejudice"],
      correctAnswer: "To Kill a Mockingbird",
    },
    {
      id: 2,
      question: "Who is the narrator of 'The Great Gatsby'?",
      options: ["Nick Carraway", "Jay Gatsby", "Daisy Buchanan", "Tom Buchanan"],
      correctAnswer: "Nick Carraway",
    },

  ];

  // حالة الامتحان
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // تحديد السؤال الحالي
  const currentQuestion = questions[currentQuestionIndex];

  // تحديد ما إذا كان السؤال الأخير
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // تحديد ما إذا كان السؤال الأول
  const isFirstQuestion = currentQuestionIndex === 0;

  // تعديل المؤشر على الزر التالي/السابق بناءً على الحالة
  const nextButtonDisabled = selectedAnswer === null;

  // التعامل مع زر "Next"
  const handleNext = () => {
    if (!nextButtonDisabled) {
      setSelectedAnswer(null); // إعادة تعيين الإجابة عند الانتقال إلى السؤال التالي
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  // التعامل مع زر "Previous"
  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  return (
    <>
      <title>Quiz Challenge</title>
      <div className="  bg-gray-100 dark:bg-gray-900  text-gray-800 dark:text-white h-screen flex items-center justify-center p-4">
        {/* Main Container */}
        <div className="w-full max-w-4xl p-6">
          {/* Header */}
          <header className="mb-6">
            <h1 className="text-3xl font-bold mb-4">Quiz Challenge</h1>
          </header>

          {/* Progress Bar */}
          <div className="mb-6">
            <p className="text-sm mb-2">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
            <div className="w-full bg-gray-600 rounded-full overflow-hidden h-2">
              <div
                className="bg-blue-500 h-full"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Current Question */}
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-4">{currentQuestion.question}</h2>
            <form>
              {currentQuestion.options.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-2 py-2 px-4 rounded-lg border border-gray-600 mb-2 cursor-pointer transition-colors"
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
              ))}
            </form>
          </section>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            {!isFirstQuestion && (
              <button
                onClick={handlePrevious}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                disabled={isFirstQuestion}
              >
                Previous
              </button>
            )}
            {isLastQuestion ? (
              <button
                onClick={handleNext}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                disabled={nextButtonDisabled}
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                disabled={nextButtonDisabled}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizPage;