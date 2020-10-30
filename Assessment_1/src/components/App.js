import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Header from "./Header";
import AppointmentForm from "./AppointmentForm";
import AppointmentList from "./AppointmentList";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/appointment" />} />
        <Route path="/appointment" component={AppointmentForm} />
        <Route path="/lists" component={AppointmentList} />
      </Switch>
    </Router>
  );
}

export default App;
