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

//edit content component imports
import RoundOrQuizEdit from "./Host/RoundOrQuizEdit";

class App extends React.Component {
  state = {
    logged_in: false
  };

  NEW_ROUND = {
    id: "",
    nickname: "",
    round_type: "",
    child_ids: []
  };

  NEW_QUIZ = {
    id: "",
    nickname: "",
    child_ids: []
  };

  handleLogin = () => {
    this.setState({ logged_in: true });
  };

  handleLogOut = () => {
    localStorage.clear("token");
    localStorage.clear("persona");
    this.setState({ logged_in: false });
  };

  renderContentArray = contentType => {
    return <IndexContentContainer contentType={contentType} />;
  };

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
              exact
              path="/questions"
              component={() => (
                <IndexContentContainer contentType="questions" />
              )}
            />
            <Route
              exact
              path="/rounds"
              component={() => <IndexContentContainer contentType="rounds" />}
            />
            <Route
              exact
              path="/rounds/edit"
              render={() => {
                return (
                  <React.Fragment>
                    <RoundOrQuizEdit
                      item={this.NEW_ROUND}
                      contentType="rounds"
                    />
                  </React.Fragment>
                );
              }}
            />
            <Route
              path="/rounds/edit/:id"
              render={({ location }) => {
                return (
                  <React.Fragment>
                    <RoundOrQuizEdit
                      item={location.state.item}
                      contentType="rounds"
                    />
                  </React.Fragment>
                );
              }}
            />
            <Route
              exact
              path="/quizzes"
              component={() => <IndexContentContainer contentType="quizzes" />}
            />
            <Route
              exact
              path="/quizzes/edit"
              render={() => {
                return (
                  <React.Fragment>
                    <RoundOrQuizEdit
                      item={this.NEW_QUIZ}
                      contentType="quizzes"
                    />
                  </React.Fragment>
                );
              }}
            />
            <Route
              path="/quizzes/edit/:id"
              render={({ location }) => {
                return (
                  <React.Fragment>
                    <RoundOrQuizEdit
                      item={location.state.item}
                      contentType="quizzes"
                    />
                  </React.Fragment>
                );
              }}
            />
          </div>
        </React.Fragment>
      );
    }
  }
}

const AppRouter = withRouter(App);

export default AppRouter;
