import { Menu } from "@headlessui/react";
import { useEffect, useState } from "react";
import { RiFilter3Fill } from "react-icons/ri";
import { File } from "../components/files/File";
import { SearchBar } from "../components/ui/SearchBar";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Empty } from "antd";

export const Compartido = () => {
  const [isOrdered, setIsOrdered] = useState(false);
  const { loadAllFilesShared, filesShared } = useAuth();

  const [searchValue, setSearchValue] = useState("");
  const [filteredFiles, setFilteredFiles] = useState([]);

  useEffect(() => {
    loadAllFilesShared();
  }, []);

  const handleSearch = (value) => {
    setSearchValue(value);

    const filteredFiles = filesShared.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredFiles(filteredFiles);
  };

  let displayFiles = searchValue ? filteredFiles : filesShared;

  if (isOrdered) {
    displayFiles = [...displayFiles].sort((a, b) => {
      const dateA = new Date(a.updated_at);
      const dateB = new Date(b.updated_at);
      return dateB - dateA;
    });
  }

  return (
    <div>
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
      <SearchBar className="mt-8" onSearch={handleSearch} />
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
                state={{
                  compartido: true,
                }}
              >
                <File
                  title={item.title}
                  date={item.date_created}
                  type="file"
                  item={item}
                  owner={false}
                />
              </Link>
            </div>
          ))
        )}
      </section>
    </div>
  );
};
