import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Header from "./Navigation/NavBar";
import HostLandingComponent from "./Host/HostLanding";
import TeamLandingComponent from "./Team/Landing";
import IndexContentContainer from "./Host/IndexContentContainer";
import StartPage from "./Login/StartPage";
import EditQuestion from "./Host/Questions/EditQuestion";
import api from "./API/Connection";

class App extends React.Component {
  state = {
    logged_in: false,
    questions: [],
    rounds: [],
    quizzes: []
  };

  componentDidMount() {
    if (api.token()) {
      api.getContent("questions").then(this.parseQuestionsSerial);
      // api.getContent("rounds").then(data => {
      //   this.setState({ rounds: data });
      // });
      // api.getContent("quizzes").then(data => {
      //   this.setState({ quizzes: data });
      // });
    }
  }

  parseQuestionsSerial = data => {
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
    this.setState({ questions: questions });
  };

  parseRoundsSerial = data => {};

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
        return (
          //edit to reflect round edit
          <EditQuestion content_type="rounds" question={question} />
        );
      case "quizzes":
        return (
          //edit to reflect quiz edit
          <EditQuestion content_type="quizzes" question={question} />
        );
      default:
        break;
    }
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
          render={match => this.renderContentItem(match.match, "questions")}
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
          render={() => this.renderContentItem("rounds")}
        />
        <Route
          path="/edit-round/:id"
          render={match => this.renderContentArray(match, "rounds")}
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
          render={() => this.renderContentItem("quizzes")}
        />
        <Route
          path="/edit-quiz/:id"
          render={match => this.renderContentArray(match, "quizzes")}
        />
      </Router>
    );
  }
}

export default App;
