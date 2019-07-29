const questions = data => {
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

const rounds = ({ data }) => {
  return data.map(round => {
    return {
      id: round.id,
      ...round.attributes,
      question_ids: round.relationships.questions.data.map(questionEntry => {
        return questionEntry.id;
      })
    };
  });
};
const quizzes = data => {
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
  questions,
  rounds,
  quizzes
};
