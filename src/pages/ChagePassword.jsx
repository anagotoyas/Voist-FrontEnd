import { Input } from "antd";
import  { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button } from "../components/ui";

export const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = (event) => {
    setCurrentPassword(event.target.value);
    setError("");
  };

  const handlePasswordChange2 = (event) => {
    setNewPassword(event.target.value);
    setError("");
  };

  const handlePasswordChange3 = (event) => {
    setNewPassword2(event.target.value);
    setError("");
  };

  const handleSaveChanges = () => {
    console.log('click')
    if (!currentPassword || !newPassword || !newPassword2) {
      setError("Todos los campos son obligatorios");
      return;
     
    }

    if (newPassword !== newPassword2) {
      setError("Las contraseñas nuevas no coinciden");
      return;
    }

    // Add logic to save changes or perform further actions
    // ...

    // If everything is successful, you can clear the form or show a success message
    setCurrentPassword("");
    setNewPassword("");
    setNewPassword2("");
    setError("Cambios guardados exitosamente");
  };

  return (
    <div className="flex w-36 justify-center items-center flex-col">
      <div className=" flex">
        <h3 className="font-quicksand text-xl">Cambiar contraseña</h3>
      </div>
      <div className="px-8 col-span-1 py-4 mt-5 rounded-lg bg-lightgray w-10 h-full">
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex flex-col">
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
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-500 font-quicksand">
            Contraseña nueva
          </label>
          <Input.Password
            placeholder="Contraseña nueva"
            onChange={handlePasswordChange2}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-500 font-quicksand">
            Repetir Contraseña nueva
          </label>
          <Input.Password
            placeholder="Repetir contraseña nueva"
            onChange={handlePasswordChange3}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </div>
        <div className="flex flex-col items-center mt-5">
          {error && <p className="text-red-500">{error}</p>}
          <Button className={"px-8 py-3"} onClick={handleSaveChanges}>
            Guardar cambios
          </Button>
        </div>
      </div>
    </div>
  );
};
