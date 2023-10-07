import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { Compartido } from "../pages/Compartido";
import { Contactos } from "../pages/Contactos";
import { useAuth } from "../context/AuthContext";
import { DetailFile } from "../pages/DetailFile";

export const NavPage = () => {
  const { isAuth } = useAuth();
  console.log(`is auth: ${isAuth}`);

  return (
    <>
      <Routes>
        <Route path="/home" element={<HomePage />}/>
        
      
        <Route path="/home/detail-file" element={<DetailFile/>}></Route>
        <Route path="/compartido" element={<Compartido />} />
        <Route path="/contactos" element={<Contactos />} />
      </Routes>
    </>
  );
};
