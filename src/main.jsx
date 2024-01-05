import React from 'react'
import ReactDOM from 'react-dom/client'
import '@mantine/core/styles.css';
import App from './App.jsx'
import './index.css'
import { createTheme, MantineProvider } from '@mantine/core';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme='light'>
      <App />
    </MantineProvider>
  </React.StrictMode>,
)
