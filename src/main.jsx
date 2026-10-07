import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LazyMotion, domAnimation } from 'framer-motion'
import App from './App.jsx'
import { ContentProvider } from './content/ContentContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LazyMotion features={domAnimation} strict>
      <BrowserRouter>
        <ContentProvider>
          <App />
        </ContentProvider>
      </BrowserRouter>
    </LazyMotion>
  </React.StrictMode>
)
