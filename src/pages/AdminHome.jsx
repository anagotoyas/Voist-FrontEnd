import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import moment from "moment";
import { LineChart } from "../components/admin/LineChart";

export const AdminHome = () => {
  const [countUsers, setCountUsers] = useState(0);
  const [countNewUsers, setCountNewUsers] = useState(0);
  const [countClass, setCountClass] = useState(0);

  const [classesCountMonth, setClassesCountMonth] = useState([]);
  const [months, setMonths] = useState([]);

  const { usersCount, usersNew, countFilesStored, countFilesStoredMonth } =
    useAuth();

  const filesStoredPerMonth = async () => {
    try {
      const data = await countFilesStoredMonth();

      if (data) {
        setClassesCountMonth(data.map((item) => parseInt(item.file_count)));
        setMonths(data.map((item) => item.month.replace("T00:00:00.000Z", "")));
      }
      
    } catch (error) {
      console.log(error.message);
    }
  };

  const filesStored = async () => {
    try {
      const data = await countFilesStored();
      if (data) {
        setCountClass(data.file_count);
      }

    } catch (error) {
      console.log(error.message);
    }
  };

  const countUsuarios = async () => {
    try {
      const data = await usersCount();
      if (data) {
        setCountUsers(data.count);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const countNewUsuarios = async () => {
    try {
      const res = await usersNew();
      if (res) {
        setCountNewUsers(res.count);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    filesStoredPerMonth();
    filesStored();
    countUsuarios();
    countNewUsuarios();

    return () => {};
  }, []);

  return (
    <div className="h-full ">
      <div className="mt-10 flex justify-around flex-wrap w-full">
        <div className="flex rounded-md flex-col items-center justify-center py-5 px-10  m-2 md:m-0 bg-amber-100">
          <p className="text-center font-bold">{countUsers}</p>
          <p className="text-center">Usuarios Registrados</p>
        </div>
        <div className="flex rounded-md flex-col items-center justify-center py-5 px-10 m-2 md:m-0 bg-blue-100">
          <p className="text-center font-bold">{countClass}</p>
          <p className="text-center">Grabaciones Registradas</p>
        </div>
        <div className="flex rounded-md flex-col items-center justify-center py-5 px-10 m-2 md:m-0 bg-green-100">
          <p className="text-center font-bold">{countNewUsers}</p>
          <p className="text-center">Usuarios Nuevos</p>
        </div>
       
      </div>

      <div className="bg-white mt-10 p-10 shadow-gray-300 shadow-lg h-2/4 md:h-3/4">
        <LineChart
         data={classesCountMonth}
         labels={months.map((item) => moment(item).format("MMM YYYY"))}
         title="Historial de Grabaciones"
        />

      </div>
    </div>
  );
};
