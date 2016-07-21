import "../common/lib";
import React from "react";
import { render } from "react-dom";
import { IndexRoute, Router, Route, hashHistory } from "react-router";
import "../common/lib";
import App from "../component/App";
import Overview from "../component/Overview";
import About from "../component/About";

render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Overview} />
            <Route path="/about" component={About}/>
      </Route>
    </Router>
), document.getElementById("react"));
