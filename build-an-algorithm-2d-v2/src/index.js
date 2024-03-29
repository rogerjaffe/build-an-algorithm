import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './views/App';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import saveLevelTrial from "./middleware/saveLevelTrial";
import loadNewLevelData from "./middleware/loadNewLevelData";
import opsController from "./middleware/opsController";
import reducer from "./reducer/reducer";
import logger from 'redux-logger';
import * as serviceWorker from './serviceWorker';
import saveBlocks from "./middleware/saveBlocks";

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(logger)
      .concat(saveLevelTrial)
      .concat(loadNewLevelData)
      .concat(saveBlocks)
      .concat(opsController),
  devTools: process.env.NODE_ENV !== 'production'
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
