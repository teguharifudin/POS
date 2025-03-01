import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProviderWrapper } from "./context/auth.context";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ConfigProvider } from './context/ConfigContext';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider>
      <AuthProviderWrapper>
        <Provider store={store}>
        <App />
      </Provider>
      </AuthProviderWrapper>
    </ConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();