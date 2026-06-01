import { createBrowserRouter } from 'react-router';
import Layout from './Layout';
import Home from './pages/Home';
import OCRC from './pages/OCRC';
import About from './pages/About';
import Contact from './pages/Contact';
import News from './pages/News';
import AdminLayout from './pages/admin/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Employees from './pages/admin/Employees';
import MissionVision from './pages/admin/MissionVision';
import ContactInfo from './pages/admin/ContactInfo';
import PlaceholderPage from './pages/admin/PlaceholderPage';

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
  {
    path: '/admin/login',
    Component: Login,
  },
  {
    path: '/admin',
    Component: AdminLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: 'employees', Component: Employees },
      { path: 'mission-vision', Component: MissionVision },
      { path: 'contact-info', Component: ContactInfo },
      { path: 'offers', Component: PlaceholderPage },
      { path: 'achievements', Component: PlaceholderPage },
      { path: 'feedback', Component: PlaceholderPage },
      { path: 'partners', Component: PlaceholderPage },
      { path: 'event-details', Component: PlaceholderPage },
      { path: 'timeline', Component: PlaceholderPage },
      { path: 'highlights', Component: PlaceholderPage },
      { path: 'sponsors', Component: PlaceholderPage },
      { path: 'news-sync', Component: PlaceholderPage },
      { path: 'core-values', Component: PlaceholderPage },
    ],
  },
]);
