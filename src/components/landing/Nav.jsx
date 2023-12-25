import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <header className="flex justify-between bg-white px-8 py-6 flex-col items-center sm:flex-row font-poppins border-b-2 h-[27vh] sticky md:h-[10vh] top-0 z-100 ">
      <a href="#">
        <img src="Logo.png" alt="logo" className="w-[15vh]" />
      </a>
      <div className="flex items-center gap-8 leading-[2rem] md:leading-[4rem] pt-3">
        <a href="#info" className="hover:text-primary hover:font-bold text-lg">
          Información
        </a>
        <a href="#que-es" className="hover:text-primary hover:font-bold text-lg">
          ¿Qué es Voist?
        </a>
        <a
          href="#funciones"
          className="hover:text-primary hover:font-bold text-lg"
        >
          Funciones
        </a>
        <a
          href="#nosotros"
          className="hover:text-primary hover:font-bold text-lg"
        >
          Nosotros
        </a>
      </div>


      <Link to="/login" className="bg-primary px-4 mt-3 py-2 rounded-full text-white font-semibold text-lg hover:bg-indigo-400">
        Iniciar sesión
      </Link>
    </header>
   
  );
};
