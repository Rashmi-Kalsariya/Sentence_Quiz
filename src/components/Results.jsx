import { useSelector, useDispatch } from 'react-redux';
import { resetQuiz } from '../store/quizSlice';
import { Button } from './ui/button';

function fillInTheBlanks(sentence, words) {
  const parts = sentence.split('_____________');
  return parts.reduce((result, part, index) => result + part + (words[index] || ''), '');
}

function Results() {
  const dispatch = useDispatch();
  const { questions, userAnswers, score } = useSelector((state) => state.quiz);
  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <div className="w-28 h-28 mx-auto rounded-full border-[10px] border-green-600 flex items-center justify-center text-4xl font-bold text-green-700">
          {percentage}
        </div>
        <p className="text-sm text-gray-600 mt-1">Overall Score</p>

        <p className="text-gray-700 text-base mt-6 leading-relaxed">
          While you correctly formed several sentences, there are a couple of areas where improvement is needed. Pay close attention to sentence structure and word placement to ensure clarity and correctness. Review your responses below for more details.
        </p>

        <Button
          className="mt-6 border border-violet-600 text-violet-600 hover:bg-violet-50"
          variant="outline"
        >
          Go to Dashboard
        </Button>
      </div>

      {/* Chevron divider */}
      <div className="flex justify-center mb-8">
        <div className="w-4 h-4 border-b border-gray-300 rotate-45 transform" />
      </div>

      {/* Question cards */}
      <div className="space-y-6">
        {questions.map((question, index) => {
          const userAnswerArray = userAnswers[question.questionId] || [];
          const isCorrect =
            JSON.stringify(question.correctAnswer) === JSON.stringify(userAnswerArray);

          const userFilled = fillInTheBlanks(question.question, userAnswerArray);
          const correctFilled = fillInTheBlanks(question.question, question.correctAnswer);
          const fallbackAnswer =
            'The quickly running boy was hard to catch, as he darted between the trees with incredible speed';

          return (
            <div
              key={question.questionId}
              className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm"
            >
              {/* Top section: Prompt and count */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs text-gray-500 font-semibold mb-1">Prompt</p>
                 
                </div>
                <p className="text-xs text-gray-400">{index + 1}/{questions.length}</p>
              </div>

              {/* Answer section */}
              <div className=" bg-gray-50 rounded-lg px-4 py-3 space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Your response{' '}
                    <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </p>
                  <p className="text-gray-900">{userFilled || fallbackAnswer}</p>
                </div>

                {!isCorrect && (
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Correct answer <span className="text-green-600">✓</span>
                    </p>
                    <p className="text-gray-900">{correctFilled}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Results;
