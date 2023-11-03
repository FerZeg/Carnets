import { StrictMode, createContext } from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Error404 from './pages/Error404/404.jsx'
import Page500 from './pages/Error500/Page500.jsx';
import { Success } from './Success.jsx';
export const loginContext = createContext({value: false, data: null})

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "about",
    element: <div>About</div>,
  },
  {
    path: "404",
    element: <Error404 />,
  },
  {
    path: "*",
    element: <Error404 />,
  },
  {
    path: "500",
    element: <Page500/>,
  },
  {
    path: "error",
    element: <Page500/>,
  },
  {
    path: "success",
    element: <Success/>,
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
