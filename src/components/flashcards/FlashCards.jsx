import { Disclosure } from "@headlessui/react";
import { RiArrowDownSLine, RiLoopRightFill } from "react-icons/ri";
import PropTypes from "prop-types";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { Spin, Typography } from "antd";

const { Text } = Typography;

export const FlashCards = ({ pdf }) => {
  const { generateFlashCards } = useAuth();
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Crea tus flashcards");

  //   console.log(pdf);

  const createFlashCards = async () => {
    try {
      setLoading(true);
      const res = await generateFlashCards({ url_pdf: pdf });
      console.log(res);

       if (!res) {
        setLoading(false);
        setMessage("No se pudo generar las flashcards");
        return;
      } else {
        setFlashcards(res || res.preguntas);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="h-[90%] lg:w-[70%] md:w-[60%] w-[40rem] md:mt-10  lg:p-8 p-4 border-dashed border-2 border-primary rounded-xl  overflow-y-auto">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-md">Flashcards</h3>
        <button
          className={`flex items-center gap-4  ${
            loading ? "bg-gray-500" : "bg-primary"
          } py-2 px-4 text-white rounded-lg hover:bg-gray-500`}
          onClick={createFlashCards}
        >
          <RiLoopRightFill
            className={`${loading ? "animate-spin" : ""} text-white`}
          />
          Generar Flashcards
        </button>
      </div>

      <div className=" w-full h-[calc(100vh-50vh)] rounded-2xl bg-white p-2">
        {flashcards.length < 1 ? (
          loading ? (
            <div className="flex lg:justify-center items-center justify-center h-full w-full  flex-wrap flex-col ">
              <Text italic className="font-bold text-md">
                Procesando...
              </Text>
              <Spin className="mt-10" size="large" />
            </div>
          ) : (
            <div className="flex justify-center items-center h-full">
              <h3 className="text-gray-500 font-bold text-xl">
                {message}
              </h3>
            </div>
          )
        ) : (
          flashcards.map((flashcard, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-amber-100 text-amber-900 px-4 py-2 text-left text-sm font-medium  hover:bg-amber-200 focus:outline-none focus-visible:ring focus-visible:ring-amber-500/75 my-2">
                    <span>{flashcard.pregunta}</span>
                    <RiArrowDownSLine
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-amber-500`}
                      s
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                    {flashcard.respuesta}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))
        )}
        {}
      </div>
    </div>
  );
};

FlashCards.propTypes = {
  pdf: PropTypes.object.isRequired,
};
