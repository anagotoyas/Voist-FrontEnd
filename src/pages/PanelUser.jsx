import { Breadcrumb, Spin } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import moment from "moment";
import { BarChart } from "../components/admin/BarChart";

export const PanelUser = () => {
  const { findUser, findTimeByUser } = useAuth();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("idUsuario");
  const [user, setUser] = useState(null);
  const [loggedTime, setLoggedTime] = useState([])

  const getUser = async () => {
    try {
      const data = await findUser(id);
      if (data) {
        
        setUser(data);
       
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getTimeByUser = async () => {
    try {
      const data = await findTimeByUser(id);
      if (data) {
       setLoggedTime(data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    
    getUser();
    getTimeByUser();
    return () => {};
  }, []);

  return (
    <>
    {(!user || !loggedTime )? (<Spin className="w-full h-full flex items-center justify-center"/>

   )
   :(
    
    <div>
      <Breadcrumb
        className="text-[1rem] font-quicksand flex  items-center"
        items={[
          {
            title: (
              <Link to="/users" className="flex items-center">
                <TeamOutlined />
                <span> Gestión de Usuarios</span>
              </Link>
            ),
          },
          {
            title: <a>{user.name} - {user.email}</a>,
          },
        ]}
      />
      <div className=" w-full h-[50%] m-4 mt-10 w-max-[700rem]">
        <section className="foto-personales flex justify-start  items-center gap-10 flex-wrap">
          <img
            src={user.gravatar}
            alt="profile-pic"
            className="rounded-full w-[8rem] flex m-auto md:m-0"
          />

          <div className="datos-personales bg-lightgray p-5 rounded-lg  w-auto ">
            <h3 className="font-bold text-xl text-primary">
              Datos personales:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 leading-8 pt-4">
              <div>
                <div>
                  <span className="font-bold">Nombres y Apellidos: </span>
                  <span>{user.name}</span>
                </div>
                <div>
                  <span className="font-bold">Correo electrónico: </span>
                  <span>{user.email}</span>
                </div>
              </div>
              <div className="pl-5">
                <div>
                  <span className="font-bold">Creación de cuenta: </span>
                  <span>{moment(user.created_at).format("DD/MM/YYYY")}</span>
                </div>
                <div>
                  <span className="font-bold">Última atualización: </span>
                  <span>{moment(user.updated_at).format("DD/MM/YYYY")}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white mt-8 p-10 shadow-gray-300 shadow-lg h-2/4 md:h-3/4">
        <BarChart
          yLabel="Minutos"
          xLabel="Dias"
          data={loggedTime.map((item) => item.minutes)}
          labels={loggedTime.map((item) =>
            moment(item.created_at.replace("T00:00:00.000Z", "")).format("MMM DD")
          )}
          title="Tiempo de uso de la aplicación"
          subtitle="Últimos 7 días"
        />

        </section>
      </div>
    </div>
    )}
    </>
  );
};
