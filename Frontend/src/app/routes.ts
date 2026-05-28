import { createBrowserRouter } from 'react-router';
import Layout from './Layout';
import Home from './pages/Home';
import OCRC from './pages/OCRC';
import About from './pages/About';
import Contact from './pages/Contact';
import News from './pages/News';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'ocrc', Component: OCRC },
      { path: 'about', Component: About },
      { path: 'contact', Component: Contact },
      { path: 'news', Component: News },
    ],
  },
]);
