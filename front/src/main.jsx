import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import {createBrowserRouter, RouterProvider, createRoutesFromElements, Route} from 'react-router-dom'
import Error404 from './pages/Error404/404.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<App />} >
    </Route>
          <Route path="/about" element={<div>About</div>} />
          <Route path="*" element={<Error404/>} />
    </>
  ))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
