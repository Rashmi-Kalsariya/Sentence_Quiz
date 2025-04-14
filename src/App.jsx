import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from './store/quizSlice';
import StartScreen from './components/StartScreen';
import Quiz from './components/Quiz';
import Results from './components/Results';

function App() {
  const dispatch = useDispatch();
  const { status, error, isComplete, started } = useSelector((state) => state.quiz);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchQuestions());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!started) {
    return <StartScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {isComplete ? <Results /> : <Quiz />}
    </div>
  );
}

export default App;