import { createBrowserRouter } from "react-router";
import Layout from "./Layout";
import Home from "./pages/Home";
import OCRC from "./pages/OCRC";
import About from "./pages/About";
import Contact from "./pages/Contact";
import News from "./pages/News";
import Login from "./pages/admin/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Services from "./pages/admin/Services";
import Achievements from "./pages/admin/Achievements";
import Testimonials from "./pages/admin/Testimonials";
import Affiliates from "./pages/admin/Affiliates";
import EventDetails from "./pages/admin/EventDetails";
import EventHighlights from "./pages/admin/EventHighlights";
import Timeline from "./pages/admin/Timeline";
import Sponsors from "./pages/admin/Sponsors";
import Employees from "./pages/admin/Employees";
import MissionVision from "./pages/admin/MissionVision";
import ContactInfo from "./pages/admin/ContactInfo";
import CoreValues from "./pages/admin/CoreValues";
import PlaceholderPage from "./pages/admin/PlaceholderPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "ocrc", Component: OCRC },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "news", Component: News },
    ],
  },
  {
    path: "/admin/login",
    Component: Login,
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "employees", Component: Employees },
      { path: "mission-vision", Component: MissionVision },
      { path: "contact-info", Component: ContactInfo },
      { path: "core-values", Component: CoreValues },
      { path: "event-details", Component: EventDetails },
      { path: "timeline", Component: Timeline },
      { path: "offers", Component: Services },
      { path: "achievements", Component: Achievements },
      { path: "feedback", Component: Testimonials },
      { path: "partners", Component: Affiliates },
      { path: "highlights", Component: EventHighlights },
      { path: "sponsors", Component: Sponsors },
      { path: "news-sync", Component: PlaceholderPage },
    ],
  },
]);
