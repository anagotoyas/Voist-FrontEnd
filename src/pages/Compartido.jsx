import { Menu } from "@headlessui/react";
import { useState } from "react";
import { RiFilter3Fill } from "react-icons/ri";
import { File } from "../components/files/File";
import { SearchBar } from "../components/ui/SearchBar";

export const Compartido = () => {
  const [isOrdered, setIsOrdered] = useState(false);

  const data = [
    {
      "id": 1,
      "title": "Mi Grabación 1",
      "date": "10/12/23",
      "type": "file"
    },
    {
      "id": 2,
      "title": "Clase de inglés",
      "date": "10/12/23",
      "type": "folder"
    },
    {
      "id": 3,
      "title": "Otro elemento",
      "date": "10/12/23",
      "type": "file"
    },
    {
      "id": 4,
      "title": "Documento importante",
      "date": "10/12/23",
      "type": "file"
    },
    {
      "id": 5,
      "title": "Proyecto secreto",
      "date": "10/12/23",
      "type": "folder"
    },
    {
      "id": 6,
      "title": "Archivo de fotos",
      "date": "10/12/23",
      "type": "folder"
    },
    {
      "id": 7,
      "title": "Video divertido",
      "date": "10/12/23",
      "type": "file"
    },
    {
      "id": 8,
      "title": "Música relajante",
      "date": "10/12/23",
      "type": "file"
    },
    {
      "id": 9,
      "title": "Proyecto en equipo",
      "date": "10/12/23",
      "type": "folder"
    },
    {
      "id": 10,
      "title": "Archivo de diseño",
      "date": "10/12/23",
      "type": "folder"
    },
    {
      "id": 11,
      "title": "Documento confidencial",
      "date": "10/12/23",
      "type": "file"
    },
    {
      "id": 12,
      "title": "Presentación de ventas",
      "date": "10/12/23",
      "type": "file"
    }
  ]
  

  return (
    <div>
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
      <SearchBar className="mt-8"/>
      <section className="my-4 pt-4 w-full flex flex-wrap gap-8 justify-center sm:justify-start">
        {data.map((item)=>(

          <File key={item.id} title={item.title} date={item.date} type={item.type} item={item} />
        
        ))}
      </section>
    </div>
  );
};
