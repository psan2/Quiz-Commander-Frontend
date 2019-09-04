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

const quiz = ({ data, included }) => {
  const quizObj = {
    id: data.id,
    ...data.attributes,
    rounds: included
      .filter(element => {
        return element.type === "round";
      })
      .map(round => {
        return {
          id: round.id,
          ...round.attributes,
          questions: parseIncludedQuestions(round, included)
        };
      })
  };
  return quizObj;
};

const parseIncludedQuestions = (round, included) => {
  const question_ids = round.relationships.questions.data.map(
    question => question.id
  );
  const questions = included
    .filter(element => {
      return element.type === "question" && question_ids.includes(element.id);
    })
    .map(question => {
      return {
        id: question.id,
        ...question.attributes,
        answers: parseIncludedAnswers(question, included)
      };
    });
  return questions;
};

const parseIncludedAnswers = (question, included) => {
  const answer_ids = question.relationships.answers.data.map(
    answer => answer.id
  );
  const answers = included
    .filter(element => {
      return element.type === "answer" && answer_ids.includes(element.id);
    })
    .map(answer => {
      return {
        id: answer.id,
        correct_answer: answer.attributes.correct_answer,
        answer_content: answer.attributes.answer_content
      };
    });
  return answers;
};

export default {
  questions,
  rounds,
  quizzes,
  quiz
};
