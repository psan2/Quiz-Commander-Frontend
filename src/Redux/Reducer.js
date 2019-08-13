const quizCommanderReducer = (
  state = {
    quiz_in_progress: {},
    questions: [],
    rounds: [],
    quizzes: []
  },
  action
) => {
  switch (action.type) {
    case "FETCH_QUESTIONS_SUCCESS":
      debugger;
      return { ...state, question_library: action.payload };
    case "FETCH_ROUNDS_SUCCESS":
      return { ...state, round_library: action.payload };
    case "FETCH_QUIZZES_SUCCESS":
      return { ...state, quiz_library: action.payload };

    default:
      return state;
  }
};

export default quizCommanderReducer;
