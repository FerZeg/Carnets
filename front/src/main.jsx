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
import { Logout } from './Logout.jsx';
import StreamersPage from './pages/Streamers/StreamersPage.jsx';
import StreamerCard from './pages/StreamerCard/StreamerCard.jsx';
export const loginContext = createContext({value: false, data: null})

import Layout from './Layout.jsx';

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout><App/></Layout>,
  },
  {
    path: "carnets",
    element: <Layout><App/></Layout>,
  },
  {
    path: "success",
    element: <Success/>,
  },
  {
    path: "logout",
    element: <Logout/>,
  },
  {
    path: "streamers",
    element: <Layout><StreamersPage/></Layout>,
  },
  {
    path: "404",
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
    path: "/:id",
    element: <Layout><StreamerCard/></Layout>,
    errorElement: <Error404/>,
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
