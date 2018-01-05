import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import { authUser } from './actions';
import App from './components/App';
import reducers from './reducers';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(
  reducers,
  applyMiddleware(
    logger,
    reduxThunk,
  ),
);

const token = window.localStorage.getItem('token');
if (token) {
  store.dispatch(authUser());
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();

