import { Input } from "antd";
import  { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button } from "../components/ui";
import { useAuth } from "../context/AuthContext";

export const ChagePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const {changePassword}=useAuth()

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

  const handleSaveChanges = async() => {
    console.log('click')
    setSuccess("")
    if (!currentPassword || !newPassword || !newPassword2) {
      setError("Todos los campos son obligatorios");
      return;
     
    }

    if (newPassword !== newPassword2) {
      setError("Las contraseñas nuevas no coinciden");
      return;
    }

    if (newPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    try {
      const res = await changePassword(currentPassword,newPassword)
      console.log(res)

      if(res.error){  
        setError("Contraseña actual incorrecta")
        return
      }
      if(res.message){
        setSuccess("Contraseña cambiada correctamente")
        setCurrentPassword("");
        setNewPassword("");
        setNewPassword2("");
        setError("");
        return
      }
      
    }
    catch (error) {
      setError(error.message);
      return;
    }

    
    setCurrentPassword("");
    setNewPassword("");
    setNewPassword2("");
    setError("");
  };

  return (
    <div className="flex justify-center flex-col w-full items-center">
      <div className="w-full flex">
        <h3 className="font-quicksand text-xl">Cambiar contraseña</h3>
      </div>
      <div className="col-span-1 px-12 py-4 mt-5 rounded-lg bg-lightgray  w-full md:w-[40rem] -z-100">
      {
          success && (
            <div className="bg-green-500  rounded-lg text-white p-2 text-center">
              {success}
            </div>
          )
        }
        {error && (
          <div className="bg-red-500 rounded-lg text-white p-2 text-center">
            {error}
          </div>
        )}
        <div className="flex flex-col mt-4">
          <label className="text-sm text-gray-500 font-quicksand">
            Contraseña actual
          </label>
          <Input.Password
            placeholder="Contraseña actual"
            onChange={handlePasswordChange}
            value={currentPassword} 
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-sm text-gray-500 font-quicksand">
            Contraseña nueva
          </label>
          <Input.Password
            placeholder="Contraseña nueva"
            value={newPassword}
            onChange={handlePasswordChange2}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-sm text-gray-500 font-quicksand">
            Repetir Contraseña nueva
          </label>
          <Input.Password
            placeholder="Repetir contraseña nueva"
            onChange={handlePasswordChange3}
            value={newPassword2}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </div>
        <div className="flex flex-col items-center mt-5">
         
          <Button className={"px-8 py-3"} onClick={handleSaveChanges}>
            Guardar cambios
          </Button>
        </div>
      </div>
    </div>
  );
};
