import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Books, Customers, Rentals, NavBar } from "./components";

export default function Routes() {
  return (
    <Router>
      <div>
        <NavBar />

        <hr />
        <Switch>
          <Route exact path="/">
            <Books />
          </Route>
          <Route path="/customers">
            <Customers />
          </Route>
          <Route path="/rentals">
            <Rentals />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
