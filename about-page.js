import React from 'react';
import ReactDOM from 'react-dom/client';
import AboutPage from './components/AboutPage.js';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element on about.html");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  React.createElement(React.StrictMode, null,
    React.createElement(AboutPage, null)
  )
);
