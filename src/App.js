// base React imports
import React from "react";
import "./App.css";
import { Route, withRouter } from "react-router-dom";

//api function imports
import api from "./API/Connection";

// navigation component imports
import NavBar from "./Navigation/NavBar";
import Sidebar from "./Navigation/Sidebar";

//login imports
import StartPage from "./Login/StartPage";

//main container import
import IndexContentContainer from "./Host/IndexContentContainer";

//persona landing area component imports
import HostLanding from "./Host/HostLanding";
import TeamLanding from "./Team/Landing";

class App extends React.Component {
  state = {
    logged_in: false
  };

  handleLogin = () => {
    this.setState({ logged_in: true });
  };

  handleLogOut = () => {
    localStorage.clear("token");
    localStorage.clear("persona");
    this.setState({ logged_in: false });
  };

  renderContentArray = content_type => {
    return <IndexContentContainer content_type={content_type} />;
  };

  // renderContentItem = (content_type, match) => {
  //   switch (content_type) {
  //     case "questions":
  //       let question;
  //       if (match) {
  //         question = this.state.questions.find(
  //           question => question.id === match.params.id
  //         );
  //       } else {
  //         question = {
  //           answers: [
  //             { answer_content: "", correct_answer: false, question_id: 0 }
  //           ],
  //           aux_content_url: null,
  //           nickname: "",
  //           question_content: "",
  //           question_type: ""
  //         };
  //       }
  //       return <QuestionEdit content_type="questions" question={question} />;
  //     case "rounds":
  //       let round;
  //       if (match) {
  //         round = this.state.rounds.find(round => round.id === match.params.id);
  //       } else {
  //         round = {
  //           questions: [
  //             { question_content: "", question_type: "", nickname: "" }
  //           ],
  //           nickname: "",
  //           round_type: ""
  //         };
  //       }
  //       return (
  //         <RoundEdit
  //           content_type="rounds"
  //           round={round}
  //           questions={this.state.questions}
  //           generateQuestionEntries={this.generateQuestionEntries}
  //         />
  //       );
  //     case "quizzes":
  //       let quiz;
  //       if (match) {
  //         quiz = this.state.quizzes.find(quiz => quiz.id === match.params.id);
  //       } else {
  //         quiz = {
  //           rounds: [],
  //           nickname: ""
  //         };
  //       }
  //       return (
  //         <QuizEdit
  //           quiz={quiz}
  //           content_type="quizzes"
  //           rounds={this.state.rounds}
  //           generateRoundEntries={this.generateRoundEntries}
  //         />
  //       );
  //     default:
  //       break;
  //   }
  // };

  // generateQuestionEntries = (
  //   all_questions,
  //   round_questions,
  //   selectable,
  //   toggleQuestionFunction
  // ) => {
  //   let questions = [];
  //   if (round_questions) {
  //     const round_question_ids = round_questions.map(question => question.id);
  //     questions = all_questions.map(question => {
  //       if (round_question_ids.includes(question.id)) {
  //         return { ...question, in_round: true };
  //       } else {
  //         return question;
  //       }
  //     });
  //   } else {
  //     questions = all_questions;
  //   }

  //   return questions.map((question, index) => {
  //     return (
  //       <Question
  //         key={index}
  //         question={question}
  //         selectable={selectable ? true : false}
  //         toggleQuestion={toggleQuestionFunction}
  //       />
  //     );
  //   });
  // };

  // generateRoundEntries = (
  //   all_rounds,
  //   quiz_rounds,
  //   selectable,
  //   toggleRoundFunction
  // ) => {
  //   let rounds = [];
  //   if (quiz_rounds) {
  //     const quiz_round_ids = quiz_rounds.map(round => round.id);
  //     rounds = all_rounds.map(round => {
  //       if (quiz_round_ids.includes(round.id)) {
  //         return { ...round, in_quiz: true };
  //       } else {
  //         return round;
  //       }
  //     });
  //   } else {
  //     rounds = all_rounds;
  //   }
  //   return rounds.map((round, index) => {
  //     return (
  //       <Round
  //         key={index}
  //         round={round}
  //         selectable={selectable ? true : false}
  //         questions={round.questions}
  //         generateQuestionEntries={this.generateQuestionEntries}
  //         toggleRound={toggleRoundFunction}
  //       />
  //     );
  //   });
  // };

  Home = () => {
    const persona = localStorage.getItem("persona");
    switch (persona) {
      case "hosts":
        return <HostLanding />;

      case "teams":
        return <TeamLanding />;
      default:
        break;
    }
  };

  render() {
    if (!api.token()) {
      return <StartPage handleLogin={this.handleLogin} />;
    } else {
      return (
        <React.Fragment>
          <Sidebar />
          <NavBar
            className="navbar"
            loginState={this.state.logged_in}
            handleLogOut={this.handleLogOut}
          />
          <div className="main">
            <Route exact path="/" component={this.Home} />
            <Route
              path="/questions"
              component={() => (
                <IndexContentContainer content_type="questions" />
              )}
            />
            <Route
              exact
              path="/questions/edit"
              render={() => this.renderContentItem("questions")}
            />
            <Route
              path="/questions/edit/:id"
              render={({ match }) => this.renderContentItem("questions", match)}
            />
            <Route
              path="/rounds"
              component={() => <IndexContentContainer content_type="rounds" />}
            />
            <Route
              exact
              path="/rounds/edit"
              render={() => this.renderContentItem("rounds")}
            />
            <Route
              path="/rounds/edit/:id"
              render={({ match }) => this.renderContentItem("rounds", match)}
            />
            <Route
              path="/quizzes"
              component={() => <IndexContentContainer content_type="quizzes" />}
            />
            <Route
              exact
              path="/quizzes/edit"
              render={() => this.renderContentItem("quizzes")}
            />
            <Route
              path="/quizzes/edit/:id"
              render={({ match }) => this.renderContentItem("quizzes", match)}
            />
          </div>
        </React.Fragment>
      );
    }
  }
}

const AppRouter = withRouter(App);

export default AppRouter;
