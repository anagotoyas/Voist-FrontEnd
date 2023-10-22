import { Menu } from "@headlessui/react";
import { useEffect, useState } from "react";
import { File } from "../components/files/File";
import { DropDownNuevo } from "../components/ui/DropDownNuevo";
import { RiFilter3Fill } from "react-icons/ri";
import { SearchBar } from "../components/ui/SearchBar";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Divider, Empty } from "antd";

export const HomePage = () => {
  const [isOrdered, setIsOrdered] = useState(false);
  const { loadAllFiles, files } = useAuth([]);

  const [searchValue, setSearchValue] = useState("");
  const [filteredFiles, setFilteredFiles] = useState([]);

  useEffect(() => {
    loadAllFiles();
    // console.log(files)
  }, [files]);

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
      <div className="flex gap-4 flex-wrap">
        <DropDownNuevo />
        <Menu as="div">
          <Menu.Button
            onClick={() => setIsOrdered(!isOrdered)}
            className={`flex items-center gap-4 ${
              isOrdered ? "bg-primary text-white" : "bg-lightgray"
            }  py-2 px-4 rounded-lg transition-colors `}
          >
            <RiFilter3Fill />
            <span className="font-quicksand">Ordenar por: más reciente</span>
          </Menu.Button>
        </Menu>
      </div>
      <SearchBar className="mt-8" onSearch={handleSearch} />
      <div>
        <h1 className="text-md font-quicksand font-bold mt-8 text-gray-500">
          Resultados: {displayFiles.length}
        </h1>
      </div>
      <Divider />
      <section className="my-4 pt-4 w-full flex flex-wrap gap-8 justify-center sm:justify-start">
        {displayFiles.length === 0 ? (
          <div className="flex items-center justify-center w-[90%] h-full mt-[5rem]">
            <Empty />
          </div>
        ) : (
          displayFiles.map((item) => (
            <div key={item.id}>
              <Link
                to={{
                  pathname: "/detail-file",
                  search: `?id=${encodeURIComponent(item.id)}`,
                }}
              >
                <File title={item.title} date={item.date_created} type="file" />
              </Link>
            </div>
          ))
        )}
      </section>
    </>
  );
};
