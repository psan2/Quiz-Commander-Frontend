import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Header from "./Navigation/NavBar";
import HostLandingComponent from "./Host/HostLanding";
import TeamLandingComponent from "./Team/Landing";
import IndexContentContainer from "./Host/IndexContentContainer";
import StartPage from "./Login/StartPage";
import EditQuestion from "./Host/Questions/EditQuestion";
import EditRound from "./Host/Rounds/EditRound";
import EditQuiz from "./Host/Quizzes/EditQuiz";
import api from "./API/Connection";
import Question from "./Host/Questions/Question";
import Round from "./Host/Rounds/Round";

class App extends React.Component {
  state = {
    logged_in: false,
    questions: [],
    rounds: [],
    quizzes: []
  };

  componentDidMount() {
    if (api.token()) {
      api.getItems("questions").then(this.parseQuestionsSerial);
    }
  }

  parseQuestionsSerial = data => {
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
    api
      .getItems("rounds")
      .then(data => this.parseRoundsSerial(data, questions));
  };

  parseRoundsSerial = (data, questions) => {
    let rounds = [];
    data.data.forEach(round => {
      let roundObj = {
        id: round.id,
        ...round.attributes,
        questions: []
      };
      round.relationships.questions.data.forEach(question => {
        roundObj.questions.push(
          questions.find(questionObj => question.id === questionObj.id)
        );
      });
      rounds.push(roundObj);
    });
    api
      .getItems("quizzes")
      .then(data => this.parseQuizzesSerial(data, rounds, questions));
  };

  parseQuizzesSerial = (data, rounds, questions) => {
    let quizzes = [];
    data.data.forEach(quiz => {
      let quizObj = {
        id: quiz.id,
        ...quiz.attributes,
        rounds: []
      };
      quiz.relationships.rounds.data.forEach(round => {
        quizObj.rounds.push(rounds.find(roundObj => round.id === roundObj.id));
      });
      quizzes.push(quizObj);
    });
    this.setState({ quizzes: quizzes, rounds: rounds, questions: questions });
  };

  handleLogin = () => {
    this.setState({ logged_in: true });
  };

  handleLogOut = () => {
    localStorage.clear("token");
    localStorage.clear("persona");
    this.setState({
      logged_in: false
    });
  };

  renderContentArray = content_type => {
    return (
      <IndexContentContainer
        content_type={content_type}
        data={this.state[content_type]}
        generateQuestionEntries={this.generateQuestionEntries}
        generateRoundEntries={this.generateRoundEntries}
      />
    );
  };

  renderContentItem = (match, content_type) => {
    switch (content_type) {
      case "questions":
        let question;
        if (match) {
          question = this.state.questions.find(
            question => question.id === match.params.id
          );
        } else {
          question = {
            answers: [
              { answer_content: "", correct_answer: false, question_id: 0 }
            ],
            aux_content_url: null,
            nickname: "",
            question_content: "",
            question_type: ""
          };
        }
        return <EditQuestion content_type="questions" question={question} />;
      case "rounds":
        let round;
        if (match) {
          round = this.state.rounds.find(round => round.id === match.params.id);
        } else {
          round = {
            questions: [
              { question_content: "", question_type: "", nickname: "" }
            ],
            nickname: "",
            round_type: ""
          };
        }
        return (
          <EditRound
            content_type="rounds"
            round={round}
            questions={this.state.questions}
            generateQuestionEntries={this.generateQuestionEntries}
          />
        );
      case "quizzes":
        let quiz;
        if (match) {
          quiz = this.state.quizzes.find(quiz => quiz.id === match.params.id);
        } else {
          quiz = {
            rounds: [],
            nickname: ""
          };
        }
        return (
          <EditQuiz
            quiz={quiz}
            content_type="quizzes"
            rounds={this.state.rounds}
            generateRoundEntries={this.generateRoundEntries}
          />
        );
      default:
        break;
    }
  };

  generateQuestionEntries = (
    all_questions,
    round_questions,
    selectable,
    toggleQuestionFunction
  ) => {
    let questions = [];
    if (round_questions) {
      const round_question_ids = round_questions.map(question => question.id);
      questions = all_questions.map(question => {
        if (round_question_ids.includes(question.id)) {
          return { ...question, in_round: true };
        } else {
          return question;
        }
      });
    } else {
      questions = all_questions;
    }

    return questions.map((question, index) => {
      return (
        <Question
          key={index}
          question={question}
          selectable={selectable ? true : false}
          toggleQuestion={toggleQuestionFunction}
        />
      );
    });
  };

  generateRoundEntries = (
    all_rounds,
    quiz_rounds,
    selectable,
    toggleRoundFunction
  ) => {
    let rounds = [];
    if (quiz_rounds) {
      const quiz_round_ids = quiz_rounds.map(round => round.id);
      rounds = all_rounds.map(round => {
        if (quiz_round_ids.includes(round.id)) {
          return { ...round, in_quiz: true };
        } else {
          return round;
        }
      });
    } else {
      rounds = all_rounds;
    }
    return rounds.map((round, index) => {
      return (
        <Round
          key={index}
          round={round}
          selectable={selectable ? true : false}
          questions={round.questions}
          generateQuestionEntries={this.generateQuestionEntries}
          toggleRound={toggleRoundFunction}
        />
      );
    });
  };

  Home = () => {
    const persona = localStorage.getItem("persona");
    switch (persona) {
      case "hosts":
        return <HostLandingComponent />;

      case "teams":
        return <TeamLandingComponent />;

      default:
        return <StartPage handleLogin={this.handleLogin} />;
    }
  };

  render() {
    return (
      <Router>
        <Header
          loginState={this.state.logged_in}
          handleLogOut={this.handleLogOut}
        />
        <Route exact path="/" component={this.Home} />
        <Route
          path="/questions"
          render={() => {
            return this.renderContentArray("questions");
          }}
        />
        <Route
          exact
          path="/edit-question"
          render={() => this.renderContentItem(null, "questions")}
        />
        <Route
          path="/edit-question/:id"
          render={({ match }) => this.renderContentItem(match, "questions")}
        />
        <Route
          path="/rounds"
          render={() => {
            return this.renderContentArray("rounds");
          }}
        />
        <Route
          exact
          path="/edit-round"
          render={() => this.renderContentItem(null, "rounds")}
        />
        <Route
          path="/edit-round/:id"
          render={({ match }) => this.renderContentItem(match, "rounds")}
        />
        <Route
          path="/quizzes"
          render={() => {
            return this.renderContentArray("quizzes");
          }}
        />
        <Route
          exact
          path="/edit-quiz"
          render={() => this.renderContentItem(null, "quizzes")}
        />
        <Route
          path="/edit-quiz/:id"
          render={({ match }) => this.renderContentItem(match, "quizzes")}
        />
      </Router>
    );
  }
}

export default App;
