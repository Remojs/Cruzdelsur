import React from 'react';
import Navbar from '../../shared/Navbar/navbar';
import Footer from '../../shared/Footer/footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
