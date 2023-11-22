import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { Compartido } from "../pages/Compartido";
import { Contactos } from "../pages/Contactos";
// import { useAuth } from "../context/AuthContext";
import { DetailFile } from "../pages/DetailFile";
import { Carpetas } from "../pages/Carpetas";
import { DetailFolder } from "../pages/DetailFolder";
import { AdminHome } from "../pages/AdminHome";
import { ListUsers } from "../pages/ListUsers";
import { PanelUser } from "../pages/PanelUser";
import { Profile } from "../pages/Profile";
import { ChagePassword } from "../pages/ChagePassword";

export const NavPage = () => {
  // const { isAuth } = useAuth();
  // console.log(`is auth app: ${isAuth}`);

  return (
    <>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/users" element={<ListUsers />} />
        <Route path="/panel-user" element={<PanelUser />} />

        <Route path="/detail-file" element={<DetailFile />}/>
        <Route path="/compartido" element={<Compartido />} />
        <Route path="/contactos" element={<Contactos />} />
        <Route path="/carpetas" element={<Carpetas />} />
        <Route path="/detail-folder" element={<DetailFolder />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/password" element={<ChagePassword />} />

      </Routes>
    </>
  );
};
