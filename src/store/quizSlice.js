import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchQuestions = createAsyncThunk(
  'quiz/fetchQuestions',
  async () => {
    const response = await axios.get('http://localhost:3001/data');
    return response.data.questions;
  }
);

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: {},
  timeRemaining: 30,
  status: 'idle',
  error: null,
  isComplete: false,
  score: 0,
  started: false,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    startQuiz: (state) => {
      state.started = true;
    },
    setAnswer: (state, action) => {
      const { questionId, answerIndex, word } = action.payload;
      if (!state.userAnswers[questionId]) {
        state.userAnswers[questionId] = Array(4).fill(null);
      }
      state.userAnswers[questionId][answerIndex] = word;
    },
    removeAnswer: (state, action) => {
      const { questionId, answerIndex } = action.payload;
      if (state.userAnswers[questionId]) {
        state.userAnswers[questionId][answerIndex] = null;
      }
    },
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
        state.timeRemaining = 30;
      } else {
        state.isComplete = true;
        state.score = calculateScore(state.questions, state.userAnswers);
      }
    },
    updateTimer: (state) => {
      if (state.timeRemaining > 0) {
        state.timeRemaining -= 1;
      }
    },
    resetQuiz: (state) => {
      state.currentQuestionIndex = 0;
      state.userAnswers = {};
      state.timeRemaining = 30;
      state.isComplete = false;
      state.score = 0;
      state.started = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

const calculateScore = (questions, userAnswers) => {
  let score = 0;
  questions.forEach((question) => {
    const userAnswer = userAnswers[question.questionId] || [];
    const isCorrect = question.correctAnswer.every(
      (answer, index) => answer === userAnswer[index]
    );
    if (isCorrect) score += 1;
  });
  return score;
};

export const {
  startQuiz,
  setAnswer,
  removeAnswer,
  nextQuestion,
  updateTimer,
  resetQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;