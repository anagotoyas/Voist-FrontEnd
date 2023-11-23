import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { RiPencilLine } from "react-icons/ri";
import { Button } from "../components/ui";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { editProfiles } from "../api/contact.api";

import { useForm } from "react-hook-form";
import { Input, Spin } from "antd";
// import { Form } from "react-router-dom";

export const Profile = () => {
  const { handleSubmit } = useForm();

  const { user, setUser } = useAuth();
  const [imageUrl, setImageUrl] = useState(user.gravatar);
  const inputRef = useRef(null);
  const [userName, setUserName] = useState(user.name);
  const [userEmail, setUserEmail] = useState(user.email);
  const [errores, setErrores] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [alert, setAlert] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }
  };
  // console.log(formErrors.currentPassword?.message)

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  // console.log(alert)

  const saveChanges = handleSubmit(async () => {
    if (currentPassword === "") {
      return setErrores("Contraseña actual es requerida");
    } else {
      setErrores("");
      const formData = new FormData();

      formData.append("image", inputRef.current.files[0]);
      formData.append("name", userName);
      formData.append("email", userEmail);
      formData.append("currentPassword", currentPassword);

      setLoading(true);
      setAlert("");
      setSuccess("");
      const res = await editProfiles(formData);

      if (res.data.error) {
        setAlert(res.data.error);
        console.log(res.data.error);
      } else {
        setUser(res.data.user);
        setAlert("");
        console.log("Perfil actualizado con éxito");
        setSuccess("Perfil actualizado con éxito");
      }
      setLoading(false);
    }
  });

  return (
    <div className="flex justify-center flex-col ww-full items-center">
      <div className="w-full flex">
        <h3 className="font-quicksand text-xl">Mi perfil</h3>
      </div>

      <form
        onSubmit={saveChanges}
        className="grid grid-col-1 md:grid-cols-2 bg-lightgray px-8 py-4 mt-5 rounded-lg max-w-[70rem] w-full gap-4"
      >
        {loading && <Spin className="col-span-2"/>}
        {
          success && (
            <div className="bg-green-500 col-span-2 rounded-lg text-white p-2 text-center">
              {success}
            </div>
          )
        }
        {alert && (
          <div className="bg-red-500 col-span-2 rounded-lg text-white p-2 text-center">
            {alert}
          </div>
        )}
        <div className="leading-10 col-span-1 pt-4">
          <h5 className="text-md text-gray-700 font-semibold pb-4 font-quicksand w-auto">
            Imagen de perfil
          </h5>
          <div className="relative w-[10rem] h-[10rem]">
            <img
              src={imageUrl}
              alt="Imagen"
              className="object-cover rounded-full w-[10rem] h-[10rem] cursor-pointer "
            />
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
              <RiPencilLine className=" text-white text-2xl " />
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
              value={userName}
              onChange={handleNameChange}
            />
          </div>
          <div className="flex flex-col mt-2">
            <label className="text-sm text-gray-500 font-quicksand ">
              Email
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-3 py-1 "
              value={userEmail}
              onChange={handleEmailChange}
            />
          </div>
          <div className="flex flex-col mt-2">
            <label className="text-sm text-gray-500 font-quicksand">
              Contraseña actual
            </label>
            <Input.Password
              placeholder="Contraseña actual"
              onChange={handlePasswordChange}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
            {errores && (
              <p className="text-red-500 text-sm font-quicksand">{errores}</p>
            )}
          </div>
          <div className="flex flex-col items-center mt-5 ">
            <Button className={"px-8 py-3"} onClick={saveChanges}>
              Guardar cambios
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};