import { useEffect, useState } from "react";
import { FolderOpenOutlined, FileOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import { Spin } from "antd";

import { RiChatVoiceLine, RiMenuFill, RiVoiceprintFill } from "react-icons/ri";
import PDFViewer from "../components/files/PDFViewer";
import { useAuth } from "../context/AuthContext";

export const DetailFile = () => {
  const { loadFile } = useAuth();
  const [transcription, setTranscription] = useState(null);
  const [duration, setDuration] = useState(null);
  const [dateCreated, setDateCreated] = useState(null);
  const [title, setTitle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const publicUrl = window.location.origin;

  useEffect(() => {
    const fetchData = async () => {
      const { transcript, duration, date_created, title } = await loadFile(id);
      setTranscription(transcript);
      setDuration(duration);
      setDateCreated(date_created);
      setTitle(title);
      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  if(location.state){
    console.log(location.state.idCarpeta)
    console.log(location.state.tituloCarpeta)
  }

  const [selectedButton, setSelectedButton] = useState("resumen");

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <>
    {
      location.state ? (<Breadcrumb
        className="text-[1rem] font-quicksand flex  items-center"
        items={[
          {
            title: (
              <Link to={{
                pathname: "/carpetas",
               
              }} className="flex items-center">
                <FolderOpenOutlined className="" /> 
                <span> Mis carpetas</span>
              </Link>
            ),
          },
          {
            title: (
              <Link to={{
                pathname: "/detail-folder",
                search: `?idCarpeta=${encodeURIComponent(location.state.idCarpeta)}`,
              }}  state={{ title: `${location.state.tituloCarpeta}` }} className="flex items-center">
                 
                <span>{location.state.tituloCarpeta} </span>
              </Link>
            ),
          },

          {
            title: <a>{title}</a>,
          },
        ]}
      />) :(<Breadcrumb
        className="text-[1rem] font-quicksand flex  items-center"
        items={[
          {
            title: (
              <Link to="/home" className="flex items-center">
                <FileOutlined className="" /> 
                <span> Mis archivos</span>
              </Link>
            ),
          },

          {
            title: <a>{title}</a>,
          },
        ]}
      />)
    }
      

      {isLoading ? (
        <div className="flex md:justify-between items-center justify-center h-[calc(100vh-9rem)] w-full flex-wrap ">
          <Spin
            size="large"
           
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-20%, -50%)",
              zIndex: "999",
            }}
          />
        </div>
      ) : (
        <div className="flex md:justify-between items-center justify-center h-[calc(100vh-9rem)] w-full flex-wrap">
          <section className="flex md:items-start items-center flex-col  h-full lg:w-[30%] w-[20rem] mt-10 pl-8">
            <div className="bg-gray-200  rounded-md mt-10 p-8 w-[90%]">
              <h2 className="text-primary font-bold pb-4 leading-3">
                Datos de la sesión
              </h2>
              <div className="leading-8">
                <p>
                  <strong>Título: </strong>
                  {title}
                </p>
                <p>
                  <strong>Fecha: </strong>
                  {dateCreated}
                </p>
                <p>
                  <strong>Duración: </strong>
                  {duration} hrs
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
            <PDFViewer
              title={title}
              className="md:mt-10"
              content={transcription}
            />
          )}
          {selectedButton === "transcripcion" && (
            <PDFViewer
              title={title}
              className="md:mt-10"
              content={transcription}
            />
          )}
          {selectedButton === "chat" && (
            <section className="flex items-center justify-start m-auto w-[25rem]">
              <img src={`${publicUrl}/chat-img.png`} alt="chat" />
            </section>
          )}
        </div>
      )}
    </>
  );
};
