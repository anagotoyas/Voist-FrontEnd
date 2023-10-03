import { LandingPage } from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/RegisterPage";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { HomePage } from "./pages/HomePage";
import { useAuth } from "./context/AuthContext";

import { Oval } from "react-loader-spinner";

function App() {
  const { isAuth, loading } = useAuth();

  if (loading) {
   
    return(
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
    </div>);
  }

  if (!isAuth) {
    console.log("Esta autenticado " +isAuth);
  }
  if (isAuth) {
    console.log("Esta autenticado yay" +isAuth);
  }

  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={!isAuth} redirectTo="/home" />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute isAllowed={isAuth} redirectTo="/" />}>
        <Route path="home" element={<HomePage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
