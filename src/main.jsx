import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// Nie importujemy już index.css z tailwindem, bo mamy CDN w htmlu

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)