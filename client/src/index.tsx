import { render } from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
// Redux store
import { store } from "./store";

import App from "./App";

const rootElement = document.getElementById("root");
render(
  <Provider store={store}>
    <Router>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Router>
  </Provider>,
  rootElement
);
