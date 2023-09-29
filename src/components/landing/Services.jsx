
import { RiUserVoiceFill, RiAlignJustify, RiMessage2Fill, RiTeamFill } from "react-icons/ri";

export const Services = () => {
  return (
    <div id="funciones" className="h-[120vh] md:h-[100vh] font-poppins w-full bg-mancha bg-repeat-x">
      <img
        src="avion.png"
        alt="avion"
        className="lg:w-[10rem] md:w-[8rem] w-[6rem] float-right -z-10 "
      />
      <section className="pt-0 md:pt-[10rem] justify-items-center grid grid-cols-1 md:grid-cols-4 md:justify-center h-full w-full">
        <div className="md:col-span-1 flex items-center flex-col p-4 ">
            <RiUserVoiceFill className="border p-4 box-content rounded-[20%] text-white text-3xl" style={{background: "linear-gradient(180deg, rgba(255, 200, 5, 0.31) 0%, #FFC805 100%)"}}/>
            <h2 className="py-3 font-bold text-center">Transcripción <br />Precisa</h2>
            <p className="text-gray-500 text-center">Para ver al detalle tus sesiones de clase.</p>
        </div>
        <div className="md:col-span-1 flex items-center flex-col p-4">
            <RiAlignJustify className="border p-4 box-content rounded-[20%] text-white text-3xl" style={{background: "linear-gradient(180deg, rgba(22, 189, 49, 0.29) 0%, #16BD31 100%)"}}/>
            <h2 className="py-3 font-bold text-center">Resumenes <br />Inteligentes</h2>
            <p className="text-gray-500 text-center">Te ahorrarán tiempo y destacarán la esencia de las clases.</p>
        </div>
        
        <div className="md:col-span-1 flex items-center flex-col p-4">
            <RiMessage2Fill className="border p-4 box-content rounded-[20%] text-white text-3xl" style={{background: "linear-gradient(180deg, rgba(34, 149, 255, 0.39) 0%, #2295FF 100%)"}}/>
            <h2 className="py-3 font-bold text-center">Chat <br />Interactivo</h2>
            <p className="text-gray-500 text-center">Chat en tiempo real para responder tus dudas sobre la clase.</p>
        </div>
        <div className="md:col-span-1 flex items-center flex-col p-4">
            <RiTeamFill className="border p-4 box-content rounded-[20%] text-white text-3xl" style={{background: "linear-gradient(180deg, rgba(237, 24, 100, 0.31) 0%, #ED1864 100%)"}}/>
            <h2 className="py-3 font-bold text-center">Comparte con <br />amigos</h2>
            <p className="text-gray-500 text-center">Podrás compartir tus sesiones de clase con tus amigos.</p>
        </div>
      </section>
    </div>
  );
};
