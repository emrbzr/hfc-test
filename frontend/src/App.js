import { createGlobalStyle } from "styled-components";
import { MainContainer } from "./containers/main";
import { Provider } from "react-redux";
import { combineReducers } from "redux";
import { applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import logger from "redux-logger";
import { createStore } from "redux";
import dashboard from "./redux/reducer/dashboard-reducer";
import userContent from "./redux/reducer/user-content-reducer";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background: #e0e0e0;
  }
`;

const initialState = {
  dashboard: {
    users: [],
  },
  userContent: {},
};

function App() {
  const store = createStore(
    combineReducers({
      dashboard,
      userContent
    }),
    initialState,
    applyMiddleware(thunk, logger)
  );

  return (
    <div className="App">
      <Provider store={store}>
        <GlobalStyle />
        <MainContainer />
      </Provider>
    </div>
  );
}

export default App;
