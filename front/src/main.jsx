import { StrictMode} from 'react';
import ReactDOM from 'react-dom/client'
import App from './pages/Home/Home.jsx'
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
import Carnet from './pages/StreamerCard/Carnet.jsx';
import Ranking from './pages/StreamerCard/Ranking.jsx';
import Layout from './Layout.jsx';
import CarnetContainer from './components/CarnetContainer/CarnetContainer.jsx';
import { CarnetMenu } from './pages/StreamerCard/CarnetMenu.jsx';
import Login from './pages/Login/LoginPage.jsx';

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout/>,
    errorElement: <Error404/>,
    children: [
      { path: "", element: <App/>},
      { path: 'carnets', element: <CarnetContainer/> },
      { path: 'streamers' , element: <StreamersPage/> },
      { path: 'login', element: <Login/> },
      {
        path: ":id",
        element: <CarnetMenu/>,
        children: [
          { path: '', element: <Carnet /> },
          { path: 'ranking', element: <Ranking /> }
        ]
      }
    ]
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
]);




ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
