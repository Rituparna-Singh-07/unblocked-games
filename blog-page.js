import React from 'react';
import ReactDOM from 'react-dom/client';
import BlogPage from './components/BlogPage.js';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element on blog.html");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  React.createElement(React.StrictMode, null,
    React.createElement(BlogPage, null)
  )
);
