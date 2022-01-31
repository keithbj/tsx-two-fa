import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SmsTelNumbers from "./containers/SmsTelNumbers";
import VerifyPasscode from "./containers/VerifyPasscode";
import NotFound from "./containers/NotFound";
import Message from "./containers/Message";
import SystemError from "./containers/SystemError";

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={SmsTelNumbers} />
        <Route path="/VerifyPasscode" exact component={VerifyPasscode} />
        <Route path="/Message" exact component={Message} />
        <Route path="/SystemError" exact component={SystemError} />
        {/* Finally, catch all unmatched routes */}
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
