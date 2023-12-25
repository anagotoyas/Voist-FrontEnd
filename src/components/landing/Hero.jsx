import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div id="" className="h-[80vh] md:h-[90vh] font-poppins grid grid-cols-1 md:grid-cols-10 px-8 mt-[5rem] md:mt-0">
      <div className="flex justify-center flex-col text-center md:text-left md:col-span-6">
        <h1 className="text-3xl md:text-6xl font-bold leading-[3rem] md:leading-[5rem]">
          Transforma tu experiencia de{" "}
          <span className="text-primary">Estudio</span>
        </h1>

        <p className="text-gray-500 py-6 text-center md:text-start">
          Potencia tu aprendizaje grabando tus clases y obteniendo una
          retroalimentación excepcional.
        </p>
        <div className="flex items-center justify-center pt-8">
          <Link to="/register" className="bg-secondary text-white font-bold px-6 py-2 rounded-full text-center hover:bg-orange-400">
            CREA UNA CUENTA
          </Link>
        </div>
      </div>
      <div className="flex md:items-center justify-center md:col-span-4">
        <img src="Hero.png" alt="hero" className=" h-[35vh] md:h-[35vh] xl:h-[60vh] lg:h-[50vh] py-3 box-border mt-[5rem] md:mt-0 object-cover" />
      </div>
    </div>
  );
};
