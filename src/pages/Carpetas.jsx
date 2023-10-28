import { Menu } from "@headlessui/react";
import { useEffect, useState } from "react";
import { RiFilter3Fill } from "react-icons/ri";
import { File } from "../components/files/File";
import { SearchBar } from "../components/ui/SearchBar";
import { useAuth } from "../context/AuthContext";
import { Divider, Empty } from "antd";

import { Link } from "react-router-dom";
import { DropDownCarpeta } from "../components/ui/DropDownCarpeta";

export const Carpetas = () => {
  const [isOrdered, setIsOrdered] = useState(false);
  const { loadAllFolders, folders } = useAuth();

  const [searchValue, setSearchValue] = useState("");
  const [filteredFolders, setFilteredFolders] = useState([]);

  useEffect(() => {
    loadAllFolders();
    
  }, []);

  const handleSearch = (value) => {
    setSearchValue(value);
   

    const filteredFolders = folders.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredFolders(filteredFolders);
  };

  let displayFolders = searchValue ? filteredFolders : folders;

  if (isOrdered) {
    displayFolders = [...displayFolders].sort((a, b) => {
      const dateA = new Date(a.updated_at);
      const dateB = new Date(b.updated_at);
      return dateB - dateA;
    });
  }

  return (
    <>
      <div className="flex gap-4 flex-wrap">
        <DropDownCarpeta />
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
      <SearchBar className="mt-8" onSearch={handleSearch}/>
      <div>
        <h1 className="text-md font-quicksand font-bold mt-8 text-gray-500">
          Resultados: {displayFolders.length}
        </h1>
      </div>
      <Divider />
      <section className="my-4 pt-4 w-full flex flex-wrap gap-8 justify-center sm:justify-start">
        {displayFolders.length === 0 ? (
          <div className="flex items-center justify-center w-[90%] h-full mt-[5rem]">
            <Empty />
          </div>
        ) : (
          displayFolders.map((item) => (
            <div key={item.id}>
              <Link
                to={{
                  pathname: "/detail-folder",
                  search: `?idCarpeta=${encodeURIComponent(item.id)}`,
                }}
                state={{ title: `${item.title}` }}
              >
                <File
                  title={item.title}
                  date={item.date_created}
                  type={"folder"}
                  item={item}      
                />
              </Link>
            </div>
          ))
        )}
      </section>
    </>
  );
};
