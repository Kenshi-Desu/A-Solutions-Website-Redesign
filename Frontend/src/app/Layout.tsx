import { Outlet } from 'react-router';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
