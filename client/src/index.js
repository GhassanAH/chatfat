import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore, applyMiddleware} from 'redux'
import reduxThunck from 'redux-thunk'
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import reducers from './reducers';

// Put any other imports below so that CSS from your
// components takes precedence over default styles.

const store = createStore(reducers, {} ,applyMiddleware(reduxThunck))


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

