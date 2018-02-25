import React from "react";
import ReactDOM from "react-dom";
import Root from "./Root";

function render(Component, rootElement) {
  ReactDOM.render(<Component />, rootElement);
}

const rootElm = document.getElementById("app");
render(Root, rootElm);

if (module.hot) {
  module.hot.accept("./Root", () => {
    const Root = require("./Root").default;
    render(Root, rootElm);
  });
}
