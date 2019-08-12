export const FETCH_QUESTIONS_SUCCESS = "FETCH_QUESTIONS_SUCCESS";
export const FETCH_ROUNDS_SUCCESS = "FETCH_ROUNDS_SUCCESS";
export const FETCH_QUIZZES_SUCCESS = "FETCH_QUIZZES_SUCCESS";

export const fetchQuestionsSuccess = questions => {
  return { type: FETCH_QUESTIONS_SUCCESS, payload: questions };
};

export const fetchRoundsSuccess = rounds => {
  return { type: FETCH_ROUNDS_SUCCESS, payload: rounds };
};

export const fetchQuizzesSuccess = quizzes => {
  return { type: FETCH_QUIZZES_SUCCESS, payload: quizzes };
};
