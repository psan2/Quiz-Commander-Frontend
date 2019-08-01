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
      child_ids: round.relationships.questions.data.map(questionEntry => {
        return questionEntry.id;
      })
    };
  });
};

const quizzes = ({ data }) => {
  return data.map(quiz => {
    return {
      id: quiz.id,
      ...quiz.attributes,
      child_ids: quiz.relationships.rounds.data.map(roundEntry => {
        return roundEntry.id;
      })
    };
  });
};

export default {
  questions,
  rounds,
  quizzes
};
