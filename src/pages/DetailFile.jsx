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

import {
  RiChatVoiceLine,
  RiFilePdf2Line,
  RiFolder2Line,
  RiMenuFill,
  RiVoiceprintFill,
} from "react-icons/ri";
import PDFViewer from "../components/files/PDFViewer";
import { useAuth } from "../context/AuthContext";
import { Chat } from "../components/chat/Chat";
import ViewFiles from "../components/view_files/ViewFiles";

export const DetailFile = () => {
  const { loadFile, createResume, saveResume, juntarTexto } = useAuth();
  const [transcription, setTranscription] = useState(null);
  const [totalContent, setTotalContent] = useState(null);
  const [have_files, setHave_files] = useState(false);
  const [summaryFiles, setSummaryFiles] = useState(false);

  const [summary, setSummary] = useState(null);
  const [duration, setDuration] = useState(null);
  const [dateCreated, setDateCreated] = useState(null);
  const [title, setTitle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  // const publicUrl = window.location.origin;

  console.log(have_files);
  console.log(summaryFiles);

  const makeRequest = async () => {
    try {
      const {
        transcript: newTranscript,
        total_content,
        duration,
        date_created,
        title,
        summary,
        have_files,
        content,
        summary_files,
      } = await loadFile(id);
      setDuration(duration);
      setDateCreated(date_created);
      setTitle(title);
      setTranscription(newTranscript);
      setTotalContent(total_content);
      setSummaryFiles(summary_files);
      setSummary(summary);
      setHave_files(have_files);

      console.log("out");
      console.log(`newTranscript: ${newTranscript}`);

      if (newTranscript !== null) {
        setIsLoading(true);
        console.log(newTranscript);
        const data_transcript = {
          url_pdf: newTranscript,
        };

        if (summary === null) {
          setIsLoading(true);
          console.log("if summary===null");
          const res = await createResume(data_transcript);

          const data2 = {
            content: res.answer,
            id: id,
            bucket: "resumen",
            atributo: "summary",
          };

          const res2 = await saveResume(data2);
          setSummary(res2.pdfUrl);
          console.log(res2.pdfUrl);
        }

        if (have_files && summaryFiles === null) {
          setIsLoading(true);
          const contentTotal = await juntarTexto(id);
          console.log(contentTotal);

          setTotalContent(contentTotal.pdfUrl);

          console.log("resumen de archivos");
          const data3 = {
            url_pdf: content,
          };
          const resp = await createResume(data3);

          const data4 = {
            content: resp.answer,
            id: id,
            bucket: "resumen_files",
            atributo: "summary_files",
          };
          const resp2 = await saveResume(data4);
          setSummaryFiles(resp2.pdfUrl);
        }
      }
      if (have_files && newTranscript && summaryFiles === null) {
        setIsLoading(true);
        const contentTotal = await juntarTexto(id);
        console.log(contentTotal);

        setTotalContent(contentTotal.pdfUrl);

        console.log("resumen de archivos");
        const data3 = {
          url_pdf: content,
        };
        const resp = await createResume(data3);

        const data4 = {
          content: resp.answer,
          id: id,
          bucket: "resumen_files",
          atributo: "summary_files",
        };
        const resp2 = await saveResume(data4);
        setSummaryFiles(resp2.pdfUrl);
        console.log(summaryFiles);
      }
      if (!have_files && newTranscript && summary) {
        setIsLoading(false);
      }
      if (have_files && newTranscript && summaryFiles && summary) {
        setIsLoading(false);
      } else {
        setTimeout(() => {
          setCount(count + 1);
        }, 100);
      }
    } catch (error) {
      console.error("Error al cargar los datos del archivo:", error);
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
        <div className="flex lg:justify-center items-center justify-center h-[calc(100vh)] w-full  flex-wrap flex-col ">
          <Text italic className="font-bold text-md">
            Procesando...
          </Text>
          <Spin className="mt-10" size="large" />
        </div>
      ) : (
        <div className="flex md:justify-between items-center justify-center h-[calc(100vh-10rem)] w-full flex-wrap">
          <section className="flex md:items-center items-center flex-col justify-center mb-10 lg:w-[30%] w-[20rem] mt-10 ">
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

            <div className="flex flex-col m-auto w-[17rem] justify-center mt-10">
              <button
                className={`${
                  selectedButton === "resumen"
                    ? "bg-primary text-white"
                    : "bg-white text-primary border border-primary"
                }  flex items-center px-4 gap-4 py-2 rounded-xl my-2`}
                onClick={() => handleButtonClick("resumen")}
              >
                <RiMenuFill /> Resumen de la transcripción
              </button>
              {have_files && (
                <>
                  <button
                    className={`${
                      selectedButton === "material"
                        ? "bg-primary text-white"
                        : "bg-white text-primary border border-primary"
                    }  flex items-center px-4 gap-4 py-2 rounded-xl my-2`}
                    onClick={() => handleButtonClick("material")}
                  >
                    <RiFilePdf2Line /> Resumen del material
                  </button>

                  <button
                    className={`${
                      selectedButton === "material_files"
                        ? "bg-primary text-white"
                        : "bg-white text-primary border border-primary"
                    }  flex items-center px-4 gap-4 py-2 rounded-xl my-2`}
                    onClick={() => handleButtonClick("material_files")}
                  >
                    <RiFolder2Line /> Archivos adjuntos
                  </button>
                </>
              )}

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
            <PDFViewer url={summary} className="h-[90%] lg:w-[70%] md:w-[60%] w-[40rem] md:mt-10 md:pl-[4rem]  lg:p-8 p-4" />
          )}
          {selectedButton === "material" && (
            <PDFViewer url={summaryFiles} className="h-[90%] lg:w-[70%] md:w-[60%] w-[40rem] md:mt-10 md:pl-[4rem]  lg:p-8 p-4" />
          )}
          {selectedButton === "material_files" && (
            <ViewFiles id={id} className="md:mt-10" />
          )}
          {selectedButton === "transcripcion" && (
            <PDFViewer className="h-[90%] lg:w-[70%] md:w-[60%] w-[40rem] md:mt-10 md:pl-[4rem]  lg:p-8 p-4" url={transcription} />
          )}
          {selectedButton === "chat" && (
            <Chat url_pdf={totalContent || transcription} classId={id}></Chat>
          )}
        </div>
      )}
    </>
  );
};
