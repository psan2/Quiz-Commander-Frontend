import api from "./Connection";

const quiz = id => {
  const quizObj = {};
  api
    .getItem("quizzes", id)
    .then(data => {
      quizObj["rounds"] = data.included.map(round => {
        return {
          id: round.id,
          round_type: round.attributes.round_type,
          nickname: round.attributes.nickname,
          question_ids: round.relationships.questions.data.map(
            question => question.id
          )
        };
      });
    })
    .then(
      api.getItems("questions").then(questionData => {
        quizObj.rounds.forEach(round => {
          round["questions"] = questionData.data
            .filter(question => {
              return round.question_ids.includes(question.id);
            })
            .map(question => {
              return {
                id: question.id,
                question_content: question.attributes.question_content,
                question_type: question.attributes.question_type,
                answer_ids: question.relationships.answers.data.map(
                  answer => answer.id
                )
              };
            });

          round.questions.forEach(question => {
            debugger;
          });
        });
        debugger;
      })
    );
};

export default {
  quiz
};
