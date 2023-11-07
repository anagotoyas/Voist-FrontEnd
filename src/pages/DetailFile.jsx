import { useEffect, useState } from "react";
import {
  FolderOpenOutlined,
  FileOutlined,
  CloudOutlined,
} from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import { Spin } from "antd";
import { Typography } from "antd";

const { Text } = Typography;

import { RiChatVoiceLine, RiMenuFill, RiVoiceprintFill } from "react-icons/ri";
import PDFViewer from "../components/files/PDFViewer";
import { useAuth } from "../context/AuthContext";


export const DetailFile = () => {
  const { loadFile,createResume,saveResume } = useAuth();
  const [transcription, setTranscription] = useState(null);
  const [summary, setSummary] = useState(null);
  const [duration, setDuration] = useState(null);
  const [dateCreated, setDateCreated] = useState(null);
  const [title, setTitle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);


  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const publicUrl = window.location.origin;
 

  const makeRequest = async () => {
    try {
      const { transcript: newTranscript, duration, date_created, title,summary } = await loadFile(id);
      setDuration(duration);
      setDateCreated(date_created);
      setTitle(title);
      setTranscription(newTranscript);
      setSummary(summary);

      if (newTranscript !== null) {
        
        const data = {
          url_pdf: newTranscript
        };
        const res = await createResume(data);
       

        const data2 = {
          content: res.answer,
          id: id,
          bucket: "resumen"
        };

        const res2 =await saveResume(data2);

        if (summary===null){
          setSummary(res2.pdfUrl)
        }
        
       
        setIsLoading(false);
      
      }
      else{
        setTimeout(() => {
          setCount(count + 1);
        }, 5000);
      }
     
    } catch (error) {
      console.error("Error al cargar los datos del archivo:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    makeRequest(); 
    
  }, [count]);

  const [selectedButton, setSelectedButton] = useState("resumen");

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <>
      {!location.state ? (
        <Breadcrumb
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
        />
      ) : location.state["tituloCarpeta"] ? (
        <Breadcrumb
          className="text-[1rem] font-quicksand flex  items-center"
          items={[
            {
              title: (
                <Link
                  to={{
                    pathname: "/carpetas",
                  }}
                  className="flex items-center"
                >
                  <FolderOpenOutlined className="" />
                  <span> Mis carpetas</span>
                </Link>
              ),
            },
            {
              title: (
                <Link
                  to={{
                    pathname: "/detail-folder",
                    search: `?idCarpeta=${encodeURIComponent(
                      location.state.idCarpeta
                    )}`,
                  }}
                  state={{ title: `${location.state.tituloCarpeta}` }}
                  className="flex items-center"
                >
                  <span>{location.state.tituloCarpeta} </span>
                </Link>
              ),
            },
            {
              title: <a>{title}</a>,
            },
          ]}
        />
      ) : location.state["compartido"] ? (
        <Breadcrumb
          className="text-[1rem] font-quicksand flex  items-center"
          items={[
            {
              title: (
                <Link to="/compartido" className="flex items-center">
                  <CloudOutlined />
                  <span> Compartido conmigo</span>
                </Link>
              ),
            },
            {
              title: <a>{title}</a>,
            },
          ]}
        />
      ) : (
        ""
      )}

      {isLoading ? (
        <div className="flex md:justify-center items-center justify-center h-[calc(100vh-9rem)] w-full flex-wrap flex-col ">
          <Text italic className="font-bold text-md">
            Procesando...
          </Text>
          <Spin className="mt-10" size="large" />
        </div>
      ) : (
        <div className="flex md:justify-between items-center justify-center h-[calc(100vh-10rem)] w-full flex-wrap">
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
            <PDFViewer url={summary} className="md:mt-10" />
          )}
          {selectedButton === "transcripcion" && (
            <PDFViewer className="md:mt-10" url={transcription} />
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
