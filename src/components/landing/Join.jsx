

export const Join = () => {
  return (
    
      <section className="h-[90vh] md:h-[40vh] font-poppins w-full  mt-[7rem] md:mt-[5rem] grid grid-cols-1 md:grid-cols-3  justify-center items-center px-8 py-8 bg-tertiary">
        <div className="col-span-2 w-full flex items-center flex-col justify-center px-6">
          <h1 className="text-3xl font-bold pb-10 text-center">
            ¿Interesado lo suficiente como para comenzar?
          </h1>
          <button className="bg-secondary px-6 py-2 rounded-full text-white font-bold">
            ÚNETE
          </button>
        </div>
        <div className="col-span-1 flex justify-center">
          <img
            src="join-us.png"
            alt="join us"
            className="rotate-90 md:rotate-0 w-[15rem] md:w-[25rem]"
          />
        </div>
      </section>
   
  );
};
