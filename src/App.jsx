import { useState } from 'react';
import './App.css';
import { Routes, Route, Outlet } from "react-router-dom";
import Homepage from './pages/homepage';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Form from "./pages/form.jsx";
import Map from "./pages/map.jsx";


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
        <Route path ="/map" element={<Map />}/>
        <Route path ="/form" element={<Form />}/>
      </Route>
    </Routes>
  );
}

export default App
