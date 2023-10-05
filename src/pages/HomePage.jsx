import { Menu } from "@headlessui/react";
import { useState } from "react";
import { File } from "../components/files/File";
import { DropDownNuevo } from "../components/ui/DropDownNuevo";
import { RiFilter3Fill } from "react-icons/ri";
import { SearchBar } from "../components/ui/SearchBar";


export const HomePage = () => {
  const [isOrdered, setIsOrdered] = useState(false);
  // console.log(user)

  const data = [
    {
      "id": 13,
      "title": "Entrevista con experto",
      "date": "15/02/24",
      "type": "file"
    },
    {
      "id": 14,
      "title": "Conferencia de audio",
      "date": "15/02/24",
      "type": "file"
    },
    {
      "id": 15,
      "title": "Podcast semanal",
      "date": "15/02/24",
      "type": "folder"
    },
    {
      "id": 16,
      "title": "Entrevista de investigación",
      "date": "15/02/24",
      "type": "file"
    },
    {
      "id": 17,
      "title": "Grabación de campo",
      "date": "15/02/24",
      "type": "file"
    },
    {
      "id": 18,
      "title": "Sesión de música en vivo",
      "date": "15/02/24",
      "type": "file"
    },
    {
      "id": 19,
      "title": "Podcast educativo",
      "date": "15/02/24",
      "type": "folder"
    },
    {
      "id": 20,
      "title": "Grabación de entrevista en radio",
      "date": "15/02/24",
      "type": "file"
    },
    {
      "id": 21,
      "title": "Narración de audiolibro",
      "date": "15/02/24",
      "type": "file"
    },
    {
      "id": 22,
      "title": "Resumen de noticias en audio",
      "date": "15/02/24",
      "type": "file"
    },
    {
      "id": 23,
      "title": "Podcast de comedia",
      "date": "15/02/24",
      "type": "folder"
    },
    {
      "id": 24,
      "title": "Grabación de lección de idioma",
      "date": "15/02/24",
      "type": "file"
    }
  ]
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
        {data.map((item)=>(

          <File key={item.id} title={item.title} date={item.date} type={item.type} />
        
        ))}
      </section>
    </>
  );
};
