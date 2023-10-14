import { DropDownNuevo } from "../components/ui/DropDownNuevo";
import { Menu } from "@headlessui/react";
import { useEffect, useState } from "react";
import { FolderOpenOutlined } from "@ant-design/icons";
import { File } from "../components/files/File";
import { RiFilter3Fill } from "react-icons/ri";
import { SearchBar } from "../components/ui/SearchBar";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Breadcrumb, Divider, Spin } from "antd";
import { Empty } from "antd";

export const DetailFolder = () => {
  const [isOrdered, setIsOrdered] = useState(false);
  const { loadAllFilesByFolder } = useAuth();
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const idCarpeta = searchParams.get("idCarpeta");

  const [searchValue, setSearchValue] = useState("");
  const [filteredFiles, setFilteredFiles] = useState([]);

  const { title } = location.state;

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await loadAllFilesByFolder(idCarpeta);
        setFiles(res);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al cargar archivos", error);
      }
    };

    fetchFiles();
  }, []);

  const handleSearch = (value) => {
    setSearchValue(value);
    console.log(value);

    const filteredFiles = files.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredFiles(filteredFiles);
  };

  let displayFiles = searchValue ? filteredFiles : files;

  if (isOrdered) {
    displayFiles = [...displayFiles].sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB - dateA;
    });
  }

  return (
    <>
      <Breadcrumb
        className="text-[1rem] font-quicksand flex  items-center"
        items={[
          {
            title: (
              <Link to="/carpetas" className="flex items-center">
                <FolderOpenOutlined className="text-xl" />
                <span> Mis carpetas</span>
              </Link>
            ),
          },

          {
            title: <a>{title}</a>,
          },
        ]}
      />

      <div className="flex gap-4 flex-wrap mt-10">
        <DropDownNuevo />
        <Menu as="div">
          <Menu.Button
            onClick={() => setIsOrdered(!isOrdered)}
            className={`flex items-center gap-4 ${
              isOrdered == true ? "bg-primary text-white" : "bg-lightgray"
            }  py-2 px-4 rounded-lg transition-colors `}
          >
            <RiFilter3Fill />

            <span className="font-quicksand">Ordenar por: más reciente</span>
          </Menu.Button>
        </Menu>
      </div>
      <SearchBar className="mt-8" onSearch={handleSearch} />
      <div>
                  <h1 className="text-md mt-8 font-quicksand font-bold  text-gray-500">
                    Resultados: {displayFiles.length}
                  </h1>
                
                </div>
                <Divider />
      <section className=" w-full flex flex-wrap gap-8 justify-center sm:justify-start">
     
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
          <>
            {displayFiles.length === 0 ? (
              <div className="flex items-center justify-center w-[90%] h-full mt-[5rem]">
                <Empty />
              </div>
            ) : (
              <>
                
               
                {displayFiles.map((item) => (
                <div key={item.id}>
                  <Link
                    to={{
                      pathname: "/detail-file",
                      search: `?id=${encodeURIComponent(item.id)}`,
                    }}
                    state={{
                      tituloCarpeta: `${title}`,
                      idCarpeta: `${idCarpeta}`,
                    }}
                  >
                    <File
                      title={item.title}
                      date={item.date_created}
                      type={"file"}
                    />
                  </Link>
                </div>
                ))}
              </>
            )}
          </>
        )}
        <></>
      </section>
    </>
  );
};
