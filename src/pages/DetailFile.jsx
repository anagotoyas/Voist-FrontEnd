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
  RiTodoLine,
  RiVoiceprintFill,
} from "react-icons/ri";
import PDFViewer from "../components/files/PDFViewer";
import { useAuth } from "../context/AuthContext";
import { Chat } from "../components/chat/Chat";
import ViewFiles from "../components/view_files/ViewFiles";
import { FlashCards } from "../components/flashcards/FlashCards";

export const DetailFile = () => {

  const { loadFile, createResume, saveResume, juntarTexto } = useAuth();
  const [transcription, setTranscription] = useState(null);
  const [totalContent, setTotalContent] = useState(null);
  const [content, setContent] = useState(null);
  const [have_files, setHave_files] = useState(false);
  const [summaryFiles, setSummaryFiles] = useState(false);
  const [only_files, setOnly_files] = useState(false);

  const [summary, setSummary] = useState(null);
  const [duration, setDuration] = useState(null);
  const [dateCreated, setDateCreated] = useState(null);
  const [title, setTitle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const makeRequest = async () => {
    try {
      try {
        const {
          transcript: newTranscript,
          total_content,
          duration,
          date_created,
          title,
          summary,
          have_files,
          summary_files,
          only_files,
          content,
        } = await loadFile(id);
        setDuration(duration);
        setDateCreated(date_created);
        setTitle(title);
        setTranscription(newTranscript);
        setTotalContent(total_content);
        setSummaryFiles(summary_files);
        setSummary(summary);
        setHave_files(have_files);
        setOnly_files(only_files);
        setContent(content);
      } catch (error) {
        console.error("Error loading file:", error);
      }

      switch (true) {
        case only_files && summaryFiles !== null:
          console.log("case 0");
          setIsLoading(false);
          break;
        case have_files &&
          transcription !== null &&
          summaryFiles !== null &&
          summary !== null:
          console.log("case 1");
          setIsLoading(false);
          break;
        case !have_files && transcription !== null && summary !== null:
          console.log("case 2");
          setIsLoading(false);
          break;
        case transcription !== null && summary === null:
          console.log("case 3");
          setIsLoading(true);

          try {
            const data_transcript = {
              url_pdf: transcription,
            };

            const res = await createResume(data_transcript);

            const data2 = {
              content: res.answer,
              id: id,
              bucket: "resumen",
              atributo: "summary",
            };

            const res2 = await saveResume(data2);
            setSummary(res2.pdfUrl);
            setCount(count + 1);

            if (!have_files && summary) {
              setIsLoading(false);
            }
          } catch (error) {
            console.error("Error creating resume:", error);
            setCount(count + 1);
          }
          break;
        case have_files && transcription && summaryFiles === null:
          console.log("case 4");
          setIsLoading(true);

          try {
            const contentTotal = await juntarTexto(id);

            setTotalContent(contentTotal.pdfUrl);

            const data3 = {
              url_pdf: contentTotal.pdfUrl,
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

            setCount(count + 1);

            setIsLoading(false);
          } catch (error) {
            console.error("Error processing files:", error);
            setCount(count + 1);
          }
          break;

        case only_files && summaryFiles === null:
          console.log("case 5");

          try {
            const data3 = {
              url_pdf: content,
            };
            const resp = await createResume(data3);
            const data = {
              content: resp.answer,
              id: id,
              bucket: "resumen_files",
              atributo: "summary_files",
            };
            const res = await saveResume(data);
            setSummaryFiles(res.pdfUrl);
            setCount(count + 1);

            setIsLoading(false);
          } catch (error) {
            console.error("Error processing files:", error);
            setCount(count + 1);
          }
          break;

        default:
          console.log("case default");
          setCount(count + 1);
          break;
      }
    } catch (error) {
      console.error("Error loading file:", error);
    }
  };

  useEffect(() => {
    makeRequest();
  }, [count]);

  const [selectedButton, setSelectedButton] = useState("chat");

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
        <div className="flex lg:justify-center items-center justify-center h-[calc(100vh-20vh)] w-full  flex-wrap flex-col ">
          <Text italic className="font-bold text-md">
            Procesando...
          </Text>
          <Spin className="mt-10" size="large" />
        </div>
      ) : (
        <div className="flex md:justify-between items-center justify-center h-full w-full flex-wrap ">
          <section className="flex md:items-center items-center flex-col justify-center mb-10 lg:w-[30%] w-[20rem] ">
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
                {(!only_files) && (
                  <p>
                    <strong>Duración: </strong>
                    {duration} hrs
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col m-auto w-[17rem] justify-center my-5">
              {!only_files && (
                <>
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
                </>
              )}

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
                  selectedButton === "chat"
                    ? "bg-primary text-white"
                    : "bg-white text-primary border border-primary"
                }  flex items-center px-4 gap-4 py-2 rounded-xl my-2`}
                onClick={() => handleButtonClick("chat")}
              >
                <RiChatVoiceLine /> Chat IA
              </button>
              <button
                className={`${
                  selectedButton === "flashcards"
                    ? "bg-primary text-white"
                    : "bg-white text-primary border border-primary"
                }  flex items-center px-4 gap-4 py-2 rounded-xl my-2`}
                onClick={() => handleButtonClick("flashcards")}
              >
                <RiTodoLine /> Flashcards
              </button>
            </div>
          </section>

          {selectedButton === "resumen" && (
            <PDFViewer
              url={summary}
              className="h-[90%] lg:w-[70%] md:w-[60%] w-[40rem]  md:pl-[4rem] "
            />
          )}
          {selectedButton === "material" && (
            <PDFViewer
              url={summaryFiles}
              className="h-[90%] lg:w-[70%] md:w-[60%] w-[40rem] md:pl-[4rem] "
            />
          )}
          {selectedButton === "material_files" && (
            <ViewFiles id={id} className="" />
          )}
          {selectedButton === "transcripcion" && (
            <PDFViewer
              className="h-[90%] lg:w-[70%] md:w-[60%] w-[40rem] md:pl-[4rem]  "
              url={transcription}
            />
          )}
          {selectedButton === "chat" && (
            <Chat
              url_pdf={totalContent || transcription || content}
              classId={id}
            ></Chat>
          )}
          {selectedButton === "flashcards" && (
            <FlashCards pdf={totalContent || transcription || content} />
          )}
        </div>
      )}
    </>
  );
};
