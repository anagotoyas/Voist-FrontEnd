

export const AboutUs = () => {
  return (
    <section id="nosotros" className="h-[100vh] md:h-[90vh] lg:h-[60vh] font-poppins w-full grid grid-cols-1 md:grid-cols-2 mt-[5rem] justify-center items-center justify-items-center px-8 py-8 ">
      <div className="px-2">
        <img
          src="about-us.png"
          alt="about-us"
          className="w-[20rem] md:w-[30rem] pr-10 py-4"
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-start pt-10  md:pt-5">¿Quiénes somos?</h1>
        <p className="text-gray-500 leading-9 text-justify mt-8 ">
          En <span className="text-primary font-bold">Voist,</span> somos un grupo apasionado de educadores visionarios. Nuestra
          misión es redefinir la forma en que los estudiantes acceden a
          retroalimentación y aprendizaje. <br /> Estamos orgullosos de formar parte de
          tu viaje educativo y nos dedicamos a proporcionarte una experiencia de
          aprendizaje excepcional. <br /> Juntos, estamos moldeando la manera en que
          estudias y te sumerges en el conocimiento.
        </p>
      </div>
    </section>
  );
};
