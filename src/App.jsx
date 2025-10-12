import { useState } from 'react'
import './App.css'
import { Routes, Route, Outlet } from "react-router-dom";
import Homepage from './pages/homepage';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import NotFound from "./pages/NotFound.jsx";


function Layout() {
  return (
    <div className="app-shell">
      <Header />
      <main className = "app-main">
        <Outlet />
      </main>
      <Footer/>
    </div>
  )
}

function App() {

  return (
    <Routes>
      <Route element={<Layout /> }>
        <Route path ="/" element={<Homepage />}/>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App
