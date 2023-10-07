import { useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

import { RiChatVoiceLine, RiMenuFill, RiVoiceprintFill } from "react-icons/ri";
import PDFViewer from "../components/files/PDFViewer";

export const DetailFile = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const publicUrl = window.location.origin;


  const contenidoResumen=`La Revolución Francesa fue un evento histórico que transformó radicalmente a Francia y dejó un impacto duradero en el mundo. Esta clase se dividió en varios puntos clave:

  Antecedentes: La Revolución Francesa surgió de problemas políticos, económicos y sociales en Francia, incluyendo tensiones sociales y la influencia de la Ilustración.
  
  Causas: Factores como la crisis económica, mala gestión financiera, la influencia de la Ilustración y la insatisfacción popular contribuyeron a la revolución.
  
  Los Tres Estados: La sociedad estaba dividida en el clero, la nobleza y el tercer estado, lo que contribuyó a la agitación social.
  
  Eventos Clave: La Toma de la Bastilla marcó el inicio de la revolución. La Declaración de los Derechos del Hombre y del Ciudadano estableció principios fundamentales. El Reinado del Terror fue una etapa violenta y radical. Napoleón dio un golpe de Estado en 1799.
  
  Legado: La Revolución Francesa influyó en todo el mundo al difundir ideas de igualdad y libertad. Napoleón tuvo un papel importante en la configuración de la Europa del siglo XIX.
  
  La Revolución Francesa sigue siendo un tema de relevancia histórica, y sus principios de igualdad y libertad continúan influyendo en la política y la sociedad.`

  const contenidoTranscrip=`¡Bienvenidos a la clase de historia! Hoy vamos a sumergirnos en uno de los eventos más influyentes de la historia mundial: la Revolución Francesa. Esta revolución, que tuvo lugar a finales del siglo XVIII en Francia, cambió radicalmente el curso de la historia y sentó las bases para muchos de los principios políticos y sociales que conocemos hoy en día. Para comprender completamente este acontecimiento, vamos a dividir nuestra lección en cuatro partes principales:

  I. Antecedentes:
  La Revolución Francesa no ocurrió de la noche a la mañana; tuvo raíces profundas en los problemas políticos, económicos y sociales de la época. Discutiremos la situación de Francia antes de la revolución, incluyendo el sistema feudal, las tensiones sociales y la influencia de la Ilustración.
  
  II. Causas de la Revolución:
  La Revolución Francesa fue el resultado de una combinación de factores. Hablaremos sobre las causas inmediatas, como la crisis económica, la mala gestión financiera de la monarquía y la creciente insatisfacción popular. También exploraremos las influencias intelectuales de la Ilustración y cómo estas ideas influyeron en el pensamiento revolucionario.
  
  III. Los Tres Estados:
  Uno de los aspectos más destacados de la Revolución Francesa fue la estructura de la sociedad en tres "estados" o "órdenes". Analizaremos quiénes eran los representantes de cada estado (el clero, la nobleza y el tercer estado) y cómo esta división contribuyó a la agitación social.
  
  IV. Los eventos clave de la Revolución:
  La Revolución Francesa estuvo marcada por una serie de eventos y etapas importantes, como la toma de la Bastilla, la Declaración de los Derechos del Hombre y del Ciudadano, la caída de la monarquía, el Reinado del Terror y la ascensión de Napoleón Bonaparte al poder. Examinaremos cada uno de estos momentos cruciales y su impacto en la historia de Francia y del mundo.
  
  V. Consecuencias y Legado:
  Finalmente, discutiremos las consecuencias a largo plazo de la Revolución Francesa. Estas incluyen la difusión de ideas revolucionarias por toda Europa, la abolición de la monarquía en Francia, el ascenso del nacionalismo y la reconfiguración del mapa político de Europa.

  VI. La Toma de la Bastilla (14 de julio de 1789):
Comencemos con uno de los eventos más emblemáticos de la Revolución Francesa, la Toma de la Bastilla. Este fue un punto de inflexión crucial que marcó el inicio de la revolución. Exploraremos por qué la Bastilla era un símbolo de la opresión monárquica, las circunstancias que llevaron a su toma por parte del pueblo parisino y cómo esto desencadenó una ola de revueltas en toda Francia.

VII. La Declaración de los Derechos del Hombre y del Ciudadano (1789):
Un documento fundamental que surgió durante la Revolución fue la Declaración de los Derechos del Hombre y del Ciudadano. Discutiremos su contenido y cómo estableció principios universales de libertad, igualdad y fraternidad que influyeron en movimientos de liberación en todo el mundo.

VIII. El Reinado del Terror (1793-1794):
Durante este período, la Revolución se tornó más radical y violenta, con la ejecución del rey Luis XVI y el ascenso del Comité de Salvación Pública. Hablaremos sobre figuras clave como Robespierre y cómo el miedo y la represión caracterizaron esta etapa conocida como el "Reinado del Terror".

IX. El Directorio y el golpe de Estado de Napoleón (1795-1799):
Después del caos del Reinado del Terror, Francia pasó por una fase conocida como el Directorio, que fue inestable. Exploraremos cómo Napoleón Bonaparte, un general ambicioso, dio un golpe de Estado en 1799 para tomar el poder y cómo esto marcó el final de la Revolución Francesa tal como la conocemos.

X. El legado de la Revolución Francesa:
La Revolución Francesa dejó un impacto duradero en la historia mundial. Discutiremos cómo las ideas de igualdad y libertad se extendieron por Europa y el mundo, influyendo en otros movimientos revolucionarios y en la configuración de nuevas naciones. También abordaremos la consolidación del poder de Napoleón y su influencia en la Europa del siglo XIX.

XI. Preguntas finales y discusión:
Antes de concluir nuestra clase, los invito a hacer preguntas y participar en una discusión sobre la Revolución Francesa. ¿Qué aspectos les parecieron más interesantes o sorprendentes? ¿Cómo creen que la Revolución Francesa influyó en la historia posterior? ¿Tienen alguna pregunta específica sobre algún evento o figura histórica relacionada con esta revolución?
  
  La Revolución Francesa es un tema rico y complejo que ha dejado un legado duradero en la política, la sociedad y la cultura. A lo largo de esta clase, también exploraremos cómo los valores de la Revolución Francesa, como la igualdad y la libertad, siguen siendo relevantes en la actualidad.`

 
  const [selectedButton, setSelectedButton] = useState("resumen");

  
  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <>
      <Breadcrumb className="text-[1rem] font-quicksand flex  items-center">
        <Breadcrumb.Item>
          <Link to="/home">
            <HomeOutlined className="text-lg" />
          </Link>
        </Breadcrumb.Item>

        <Breadcrumb.Item>{id}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex md:justify-between items-center justify-center h-[calc(100vh-9rem)] w-full flex-wrap">
        <section className="flex md:items-start items-center flex-col  h-full lg:w-[30%] w-[20rem] mt-10 pl-8">
          <div className="bg-gray-200  rounded-md mt-10 p-8 w-[90%]">
            <h2 className="text-primary font-bold pb-4 leading-3">
              Datos de la sesión
            </h2>
            <div className="leading-8">
              <p>
                <strong>Título: </strong>
                {id}
              </p>
              <p>
                <strong>Fecha: </strong>12/12/23
              </p>
              <p>
                <strong>Hora inicio: </strong>16:00:00 hrs
              </p>
              <p>
                <strong>Hora fin: </strong>17:00:00 hrs
              </p>
            </div>
          </div>
          <div className="flex flex-col m-auto w-[10rem] justify-center mt-10">
            <button
              className={`${
                selectedButton === "resumen"
                  ? "bg-primary text-white"
                  : "bg-white text-primary border border-primary"
              }  flex items-center px-4 gap-4 py-2 rounded-xl my-2`}
              onClick={() => handleButtonClick("resumen")}
            >
              <RiMenuFill /> Resumen
            </button>
            <button
              className={`${
                selectedButton === "transcripcion"
                  ? "bg-primary text-white"
                  : "bg-white text-primary border border-primary"
              } flex items-center px-4 gap-4 py-2 rounded-xl my-2`}
              onClick={() => handleButtonClick("transcripcion")}
            >
              <RiVoiceprintFill /> Transcripción
            </button>
            <button
              className={`${
                selectedButton === "chat"
                  ? "bg-primary text-white"
                  : "bg-white text-primary border border-primary"
              }  flex items-center px-4 gap-4 py-2 rounded-xl my-2`}
              onClick={() => handleButtonClick("chat")}
            >
              <RiChatVoiceLine /> Chat IA
            </button>
          </div>
        </section>
        {selectedButton === "resumen" && (
          <PDFViewer title={id} className="md:mt-10" content={contenidoResumen}/>
        )}
        {selectedButton === "transcripcion" && (
            <PDFViewer title={id} className="md:mt-10" content={contenidoTranscrip}/>
        )}
        {selectedButton === "chat" && (
          <section className="flex items-center justify-start m-auto w-[25rem]">
            <img src={`${publicUrl}/chat-img.png`} alt="chat" />
          </section>
        )}
      </div>
    </>
  );
};
