import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAnswer, removeAnswer, nextQuestion, updateTimer } from '../store/quizSlice';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Quiz() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    questions,
    currentQuestionIndex,
    userAnswers,
    timeRemaining,
  } = useSelector((state) => state.quiz);

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswers = userAnswers[currentQuestion?.questionId] || Array(4).fill(null);
  const isAllAnswered = currentAnswers.every((answer) => answer !== null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeRemaining > 0) {
        dispatch(updateTimer());
      } else {
        dispatch(nextQuestion());
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch, timeRemaining]);

  const handleWordSelect = (word) => {
    const emptyIndex = currentAnswers.findIndex((answer) => answer === null);
    if (emptyIndex !== -1) {
      dispatch(setAnswer({
        questionId: currentQuestion.questionId,
        answerIndex: emptyIndex,
        word,
      }));
    }
  };

  const handleBlankClick = (index) => {
    if (currentAnswers[index] !== null) {
      dispatch(removeAnswer({
        questionId: currentQuestion.questionId,
        answerIndex: index,
      }));
    }
  };

  const handleQuit = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate('/');
    }
  };


  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-8 py-24">
      <div className="w-full max-w-3xl">
        <div className="border border-gray-200 rounded-2xl p-10 shadow-sm relative">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-base font-medium text-gray-900">
              {String(Math.floor(timeRemaining / 60)).padStart(2, '0')}:
              {String(timeRemaining % 60).padStart(2, '0')}
            </div>
            <button
              className="px-4 py-1.5 border border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-400 rounded-md text-sm transition z-10"
              onClick={handleQuit}
            >
              Quit
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex justify-center mb-10">
            <div className="w-full max-w-full flex gap-2">
              {Array.from({ length: questions.length }).map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${index <= currentQuestionIndex ? 'bg-orange-400' : 'bg-gray-200'}`}
                />
              ))}
            </div>
          </div>

          {/* Instruction */}
          <p className="text-center text-sm font-semibold text-gray-500 mb-10">
            Select the missing words in the correct order
          </p>

          {/* Question Text */}
          <div className="text-center text-md leading-loose font-medium text-gray-800 mb-12">
            {currentQuestion.question.split('_____________').map((part, index, array) => (
              <span key={index}>
                {part}
                {index < array.length - 1 && (
                  <button
                    onClick={() => handleBlankClick(index)}
                    className={`mx-1 px-3 py-1 border-b-2 rounded ${currentAnswers[index] ? 'border-gray-500 text-gray-800' : 'border-gray-300 text-gray-400'}`}
                    style={{ minWidth: '80px' }}
                  >
                    {currentAnswers[index] || ' '}
                  </button>
                )}
              </span>
            ))}
          </div>

          <div className="w-full overflow-x-auto">
            <div className="flex justify-center w-max gap-2 mx-auto mb-10 px-2">
              {currentQuestion.options.map((word) => (
                <button
                  key={word}
                  onClick={() => handleWordSelect(word)}
                  disabled={currentAnswers.includes(word)}
                  className={`px-4 py-2 text-sm rounded-md transition font-medium border text-center ${currentAnswers.includes(word) ? 'bg-gray-100 text-gray-400 border-gray-200' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                  style={{ minWidth: '80px', maxWidth: '180px', whiteSpace: 'normal', wordBreak: 'break-word' }}
                >
                  {word}
                </button>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <div className="flex justify-end">
            <Button
              onClick={() => dispatch(nextQuestion())}
              disabled={!isAllAnswered}
              className={`flex items-center gap-2 px-6 py-2 border border-gray-300 text-sm font-medium rounded-md transition ${isAllAnswered ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white-200 text-gray-400 cursor-not-allowed'}`}
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
