

import { LandingPage } from './pages/LandingPage';
import LoginPage from './pages/LoginPage'
import { Routes, Route } from "react-router-dom";
import NotFound from './pages/NotFound';
import RegisterPage from './pages/RegisterPage';

import { HomePage } from './pages/HomePage';


function App() {

 

  return (
    <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="home" element={<HomePage />} />

   
    <Route path="*" element={<NotFound />} />
  </Routes>
  );
}

export default App;
