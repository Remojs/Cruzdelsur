import { createHashRouter } from 'react-router-dom';
import Home from '../features/home/home';
import Layout from './layout/Layout';
import Charters from '../features/charters/charters';
import WebinarPage from '../pages/webinar/webinar';
import Contact from '../pages/contact/Contact';
import { NotFound, UnderConstruction } from '../ui';

export const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
        index: true,
      },
      {
        path: '/flights',
        element: <Charters />,
      },
      {
        path: '/webinar',
        element: <UnderConstruction />,
      },
      // Navbar routes - Under Construction
      {
        path: '/learning',
        element: <UnderConstruction />,
      },
      {
        path: '/recruitment',
        element: <UnderConstruction />,
      },
      {
        path: '/careers',
        element: <UnderConstruction />,
      },
      {
        path: '/consulting',
        element: <UnderConstruction />,
      },
      {
        path: '/safety',
        element: <UnderConstruction />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/search',
        element: <UnderConstruction />,
      },
      {
        path: '/cart',
        element: <UnderConstruction />,
      },
      // 404 catch-all route
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);