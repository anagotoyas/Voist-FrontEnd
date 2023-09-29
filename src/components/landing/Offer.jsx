export const Offer = () => {
  return (
    <section className="h-[150vh] md:h-[70vh] font-poppins w-full  mt-[1.5rem] md:mt-[0rem] grid grid-cols-1 md:grid-cols-2 items-center justify-center justify-items-center px-8 py-8" id="info">
        
      <div>
        <h1 className="text-3xl font-bold text-start">¿Qué ofrecemos?</h1>
        <p className="text-gray-500 leading-9 text-justify mt-8 pr-4">
          Al utilizar nuestra aplicación, experimentarás una notable mejora en
          tu proceso de aprendizaje. <br /> Dispondrás de la información de tus clases
          al alcance de tu mano, lo que reducirá significativamente el tiempo
          dedicado al estudio. Además, obtendrás apuntes precisos y detallados,
          evitando malentendidos y errores de interpretación. <br /> Tus notas de clase
          estarán seguras en la nube, lo que significa que podrás acceder a
          ellas desde cualquier lugar y en cualquier momento. <br /> Por último,
          gracias a nuestro chat de consulta, podrás aclarar tus dudas en tiempo
          real, lo que potenciará tu comprensión y te ayudará a obtener un
          aprendizaje más efectivo.
        </p>
      </div>
      <div className="px-2">
        <img src="chica.png" alt="chica" className="w-[20rem] md:w-[35rem] pl-4 py-4 box-content"/>
      </div>
    </section>
  );
};
