const initialState = {
  quiz_in_progress: {},
  item_in_edit: {},
  question_library: [],
  round_library: [],
  quiz_library: []
};

qcState = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_QUESTION_LIBRARY":
      return { ...state, question_library: action.payload };
    case "UPDATE_ROUND_LIBRARY":
      return { ...state, round_library: action.payload };
    case "UPDATE_QUESTION_LIBRARY":
      return { ...state, quiz_library: action.payload };

    default:
      return state;
  }
};

export default qcState;
