import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./style.css";
import { BrowserRouter } from 'react-router-dom';
import { Context } from './utils/Context';
import { ContextDate } from './utils/ContextDate';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <ContextDate>
      <Context>
        <App />
      </Context>
      </ContextDate>
    </BrowserRouter>
);
