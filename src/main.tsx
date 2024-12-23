import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.css'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './app/store'

import { createRoot } from 'react-dom/client';

const domNode = document.getElementById('root');
const root = createRoot(domNode!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)