import { LandingPage } from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/RegisterPage";

import { ProtectedRoute } from "./components/ProtectedRoute";

import { useAuth } from "./context/AuthContext";

import { Oval } from "react-loader-spinner";
import { Sidebar } from "./components/sidebar/Sidebar";

import { NavPage } from "./components/NavPage";

function App() {
  const { isAuth, loading, user } = useAuth();

  let admin = false;
  if (user) {
    admin = user.role === 1 ? true : false;
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Oval
          height={80}
          width={80}
          color="#5271FF"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#5271FF"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/*" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        element={
          <>
            <ProtectedRoute isAllowed={isAuth} redirectTo="/login" />
          </>
        }
      >
        <Route element={<Sidebar />}>
          <Route
            element={<ProtectedRoute isAllowed={admin} redirectTo="/login" />}
          >
            <Route path="/admin" element={<NavPage />} />
            <Route path="/users" element={<NavPage />} />
            <Route path="/panel-user" element={<NavPage />} />
            <Route path="/password" element={<NavPage />} />
          </Route>

          <Route
            element={<ProtectedRoute isAllowed={!admin} redirectTo="/login" />}
          >
            <Route path="/home" element={<NavPage />} />
            <Route path="/detail-file" element={<NavPage />} />
            <Route path="/attached-file/:id" exact component={<NavPage/>} />
            <Route path="/compartido" element={<NavPage />} />
            <Route path="/contactos" element={<NavPage />} />
            <Route path="/carpetas" element={<NavPage />} />
            <Route path="/detail-folder" element={<NavPage />} />
            <Route path="/profile" element={<NavPage />} />
            <Route path="/password" element={<NavPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
