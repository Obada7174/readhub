"use client";

import { useState } from "react";

const QuizPage = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <>
      <title>Quiz Challenge: The Great Gatsby</title>
      <div className=" text-white w-full max-w-4xl flex items-center justify-center p-4">
        {/* Main Container */}
        <div className=" container bg-gray-800 border rounded-lg shadow-md p-6">
          {/* Header */}
          <header className="mb-6 text-center">
            <h1 className="text-3xl font-bold mb-4">Quiz Challenge: The Great Gatsby</h1>
            <p className="text-gray-300">
              Test your knowledge of F. Scott Fitzgerald's masterpiece, "The Great Gatsby." This quiz covers key plot points, character details, and thematic elements. Challenge yourself and see how well you know this iconic novel.
            </p>
          </header>

          {/* Quiz Details */}
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-4">Quiz Details</h2>

            {/* Row 1 */}
            <div className="grid grid-cols-2 gap-4 py-2">
              <div><strong>Book:</strong></div>
              <div>The Great Gatsby</div>
            </div>
            <hr className="border-gray-600 my-2" />

            {/* Row 2 */}
            <div className="grid grid-cols-2 gap-4 py-2">
              <div><strong>Author:</strong></div>
              <div>F. Scott Fitzgerald</div>
            </div>
            <hr className="border-gray-600 my-2" />

            {/* Row 3 */}
            <div className="grid grid-cols-2 gap-4 py-2">
              <div><strong>Number of Questions:</strong></div>
              <div>20</div>
            </div>
            <hr className="border-gray-600 my-2" />

            {/* Row 4 */}
            <div className="grid grid-cols-2 gap-4 py-2">
              <div><strong>Time Limit:</strong></div>
              <div>30 minutes</div>
            </div>
            <hr className="border-gray-600 my-2" />
          </section>

          {/* Start Quiz Button */}
          <div className="text-center mt-4">
            <button
              onClick={() => setShowQuiz(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded transition-colors"
            >
              Start Quiz
            </button>
          </div>

          {/* Quiz Content (Hidden initially) */}
          {showQuiz && (
            <section className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Question 1</h2>
              <p className="mb-4">Who is the narrator of "The Great Gatsby"?</p>
              <form className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="answer" value="a" />
                  <span>Nick Carraway</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="answer" value="b" />
                  <span>Jay Gatsby</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="answer" value="c" />
                  <span>Daisy Buchanan</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="answer" value="d" />
                  <span>Tom Buchanan</span>
                </label>
              </form>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default QuizPage;