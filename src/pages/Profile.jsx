import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { RiEdit2Fill } from "react-icons/ri";
import { Button } from "../components/ui";

export const Profile = () => {
  const { user } = useAuth();
  const [imageUrl, setImageUrl] = useState(user.gravatar);
  const inputRef = useRef(null);

  // Función para manejar el cambio de imagen al seleccionar un archivo
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Convierte la imagen a una URL de datos (data URL) para mostrarla
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }
  };

  return (
    <div className="flex justify-center flex-col ">
      <div className="w-full flex">
        <h3 className="font-quicksand text-xl">Gestión de Usuarios</h3>
      
      </div>
      <div className="grid grid-cols-2 bg-lightgray px-8 py-4 mt-5 rounded-lg">
        <div className="leading-10 col-span-1 pt-4">
          <h5 className="text-md text-gray-700 font-semibold pb-4 font-quicksand w-auto">
            Imágen de perfil
          </h5>

          {/* Muestra la imagen actual con un manejador de clic */}
          <div className="relative w-[10rem] h-[10rem]">
            <img
              src={imageUrl}
              alt="Imagen"
              className="object-cover rounded-full w-[10rem] h-[10rem] cursor-pointer "
            />

            {/* Input de tipo file oculto */}
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
              ref={inputRef}
            />
            <div
              className="bg-gray-700 hover:bg-gray-500 rounded-full flex items-center justify-center w-8 h-8 absolute bottom-[calc(10%)] right-[calc(10%)] "
              onClick={() => inputRef.current.click()}
            >
              <RiEdit2Fill className=" text-white text-2xl " />
            </div>
          </div>
        </div>
        <div>
          <h5 className="text-md text-gray-700 font-semibold py-4 font-quicksand">
            Información personal
          </h5>
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 font-quicksand">
              Nombre
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-3 py-1"
              value={user.name}
              
            />
          </div>
          <div className="flex flex-col mt-2">
            <label className="text-sm text-gray-500 font-quicksand ">
              Email
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-3 py-1 "
              value={user.email}
              
            />
          </div>
        </div>
        
       
        <div className="col-span-1 pt-4">
        <h5 className="text-md text-gray-700 font-semibold py-4 font-quicksand">
            Cambiar contraseña         </h5>
        <div className="flex flex-col">
          <label className="text-sm text-gray-500 font-quicksand">Contraseña actual</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md px-3 py-1"
            
            
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-500 font-quicksand">Contraseña nueva</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md px-3 py-1"
           
            
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-500 font-quicksand">Repetir Contraseña nueva</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md px-3 py-1"
           
            
          />
        </div>

        </div>
        <div className="flex flex-col items-center mt-5 ">
          
          <Button className={'px-8 py-3'}>
            Guardar cambios
          </Button>
          </div>
        </div>
   
    </div>
  );
};
