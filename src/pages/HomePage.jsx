import { Menu } from "@headlessui/react";
import { useEffect, useState } from "react";
import { File } from "../components/files/File";
import { DropDownNuevo } from "../components/ui/DropDownNuevo";
import { RiFilter3Fill } from "react-icons/ri";
import { SearchBar } from "../components/ui/SearchBar";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";



export const HomePage = () => {

  // const navigate = useNavigate()
  const [isOrdered, setIsOrdered] = useState(false);
  const { loadAllFiles, files} = useAuth();
  console.log(`files: ${files}`)
  // console.log(user)

  useEffect(()=>{
    loadAllFiles()
  })


  return (
    <>
      <div className="flex gap-4 flex-wrap">
       <DropDownNuevo/>
        <Menu as="div">
          <Menu.Button
            onClick={() => setIsOrdered(!isOrdered)}
            className={`flex items-center gap-4 ${
              isOrdered == true ? "bg-primary text-white" : "bg-lightgray"
            } hover:bg-primary hover:text-white py-2 px-4 rounded-lg transition-colors `}
          >
            <RiFilter3Fill />

            <span className="font-quicksand">Ordenar por: más reciente</span>
          </Menu.Button>
        </Menu>
      </div>
      <SearchBar className="mt-8"/>
      <section className="my-4 pt-4 w-full flex flex-wrap gap-8 justify-center sm:justify-start">
      {files.map((item) => (
        <div key={item.id}>
         
           
            <Link  to={{
              pathname: "/home/detail-file",
        search: `?id=${encodeURIComponent(item.id)}`,
            }}
             >
              <File title={item.title} date={item.date_created} type={'file'} />
            </Link>
          
          
        </div>
      ))}
      </section>
      {/* <section className="my-4 pt-4 w-full flex flex-wrap gap-8 justify-center sm:justify-start">
      {data.map((item) => (
        <div key={item.id}>
          {item.type === "file" ? (
           
            <Link  to={{
              pathname: "/home/detail-file",
        search: `?id=${encodeURIComponent(item.title)}`,
            }}
             >
              <File title={item.title} date={item.date} type={item.type} />
            </Link>
          ) : (
            // Mostrar una carpeta si el elemento es una carpeta
            <File title={item.title} date={item.date} type={item.type} />
          )}
        </div>
      ))}
      </section> */}
    </>
  );
};
