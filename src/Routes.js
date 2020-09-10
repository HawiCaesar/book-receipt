import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Books, Customers, Rentals } from "./components";

export default function Routes() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Books</Link>
          </li>
          <li>
            <Link to="/customers">Customers</Link>
          </li>
          <li>
            <Link to="/rentals">Rentals</Link>
          </li>
        </ul>

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
