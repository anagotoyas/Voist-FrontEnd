import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { MisClases } from "../pages/MisClases";
import { Compartido } from "../pages/Compartido";
import { Contactos } from "../pages/Contactos";

export const NavPage = () => {
  return (
    <>
    <Routes
      >
      
        <Route path="/home" element={<HomePage />} />
        <Route path="/mis-clases" element={<MisClases />} />
        <Route path="/compartido" element={<Compartido />} />
        <Route path="/contactos" element={<Contactos />} />
      </Routes>

    </>
  )
}
