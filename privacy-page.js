import React from 'react';
import ReactDOM from 'react-dom/client';
import PrivacyPage from './components/PrivacyPage.js';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element on privacy.html");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  React.createElement(React.StrictMode, null,
    React.createElement(PrivacyPage, null)
  )
);
