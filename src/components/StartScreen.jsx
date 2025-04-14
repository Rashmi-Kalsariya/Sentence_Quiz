import { useDispatch } from 'react-redux';
import { startQuiz } from '../store/quizSlice';
import { Button } from './ui/button';
import { FileText } from 'lucide-react';

function StartScreen() {
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header with icon */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Sentence Construction
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Select the correct words to complete the sentence by arranging
            the provided options in the right order.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-3 gap-4 py-8">
          <div className="text-center">
            <h3 className="text-sm font-medium text-black-500">Time Per Question</h3>
            <p className="mt-1 text-xl font-semibold text-gray-400">30 sec</p>
          </div>
          <div className="text-center">
            <h3 className="text-sm font-medium text-black-500">Total Questions</h3>
            <p className="mt-1 text-xl font-semibold text-gray-400">10</p>
          </div>
          <div className="text-center">
            <h3 className="text-sm font-medium text-black-500">Coins</h3>
            <div className="flex items-center justify-center mt-1">
              <span className="ml-1 text-yellow-400">🪙</span>
              <span className="text-xl font-semibold text-gray-400">0</span>
            </div>
          </div>
        </div>

       {/* Buttons in a row */}
<div className="flex justify-center gap-4">
  <Button
    variant="outline"
    className="px-8 border-blue-700 text-blue-700 hover:bg-gray-50"
    onClick={() => window.history.back()}
  >
    Back
  </Button>
  <Button
    className="px-8 bg-blue-600 hover:bg-blue-700 text-white"
    onClick={() => dispatch(startQuiz())}
  >
    Start
  </Button>
</div>

      </div>
    </div>
  );
}

export default StartScreen;