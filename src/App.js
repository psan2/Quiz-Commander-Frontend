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
