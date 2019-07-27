const parseQuestionsSerial = data => {
  if (!data.data) {
    return;
  }
  let questions = [];
  data.data.forEach(question => {
    let questionObj = {
      id: question.id,
      ...question.attributes
    };
    const answers = data.included
      .filter(
        answer => answer.attributes.question_id === parseInt(question.id, 10)
      )
      .map(answer => {
        return {
          answer_content: answer.attributes.answer_content,
          correct_answer: answer.attributes.correct_answer
        };
      });
    questionObj = { ...questionObj, answers: answers };
    questions.push(questionObj);
  });
  return questions;
};

const parseRoundsSerial = ({ data }) => {
  debugger;
  return data.map(round => {
    let roundObj = {
      id: round.id,
      ...round.attributes
    };
    const question_ids = data.relationships.map(questionEntry => {
      return questionEntry.id;
    });
    return { ...roundObj, question_ids: question_ids };
  });
};

const parseQuizzesSerial = data => {
  let quizzes = [];
  data.data.forEach(quiz => {
    let quizObj = {
      id: quiz.id,
      ...quiz.attributes
    };
    quizzes.push(quizObj);
  });
  return quizzes;
};

export default {
  parseQuestionsSerial,
  parseRoundsSerial,
  parseQuizzesSerial
};
