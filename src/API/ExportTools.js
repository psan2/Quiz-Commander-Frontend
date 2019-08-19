import api from "./Connection";
import Deserializer from "./Deserializer";

const quiz = id => {
  let quizObj = {};
  api.getItem("quizzes", id).then(data => {
    quizObj = Deserializer.quiz(data);
  });
};

export default {
  quiz
};
