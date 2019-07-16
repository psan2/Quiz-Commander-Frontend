import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Header from "./Navigation/NavBar";
import HostLandingComponent from "./Host/Landing";
import TeamLandingComponent from "./Team/Landing";
import ContentIndexContainer from "./Host/ContentIndexContainer";
import StartPage from "./Login/StartPage";

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
    this.setState({
      logged_in: false
    });
  };

  Home = () => {
    const persona = localStorage.getItem("persona");
    switch (persona) {
      case "hosts":
        return <HostLandingComponent handleLogOut={this.handleLogOut} />;

      case "teams":
        return <TeamLandingComponent handleLogOut={this.handleLogOut} />;

      default:
        return <StartPage handleLogin={this.handleLogin} />;
    }
  };

  Questions = () => {
    return <ContentIndexContainer content="questions" />;
  };

  Rounds = () => {
    return <ContentIndexContainer content="rounds" />;
  };

  Quizzes = () => {
    return <ContentIndexContainer content="quizzes" />;
  };

  render() {
    return (
      <Router>
        <div>
          <Header />

          <Route exact path="/" component={this.Home} />
          <Route path="/questions" component={this.Questions} />
          <Route path="/rounds" component={this.Rounds} />
        </div>
      </Router>
    );
  }
}

export default App;
