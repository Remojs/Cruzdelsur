import { createBrowserRouter } from 'react-router-dom';
import Home from '../features/home/home';
import Layout from './layout/Layout';
import Charters from '../features/charters/charters';
import WebinarPage from '../pages/webinar/webinar';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
        index: true,
      },
      {
        path: '/charters',
        element: <Charters />,
      },
      {
        path: '/webinar',
        element: <WebinarPage />,
      },
    ],
  },
]);