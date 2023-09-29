export const Footer = () => {
  return (
    <section className="bg-white h-[20vh] flex items-end">
        <div className="bg-gray-300 flex flex-col xl:flex-row justify-center items-center gap-4 xl:gap-0 xl:justify-between w-full p-4">
      <div>
        <p className="text-gray-800 text-center md:text-left">
          &copy; 2023
          <span className="text-gray-900 font-bold"> Voist.</span> Todos los
          derechos reservados.
        </p>
      </div>
      <div className="flex flex-col xl:flex-row items-center gap-2">
        <a
          href="#"
          className="text-gray-700 hover:text-gray-900 transition-colors"
        >
          Terminos y condiciones
        </a>
        <span className="hidden xl:flex">|</span>
        <a
          href="#"
          className="text-gray-700 hover:text-gray-900 transition-colors"
        >
          Política de privacidad
        </a>
      </div>
    </div>

    </section>
    
  );
};
