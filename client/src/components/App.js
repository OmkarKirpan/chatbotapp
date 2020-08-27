import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";

import Landing from "./pages/Landing";
import About from "./pages/About";
import Chatbot from "./chatbot/Chatbot";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          {/* <Header /> */}
          <Route exact path="/" component={Landing} />
          <Route exact path="/about" component={About} />
          <Chatbot />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
