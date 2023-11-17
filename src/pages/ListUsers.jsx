import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { TableUsers } from "../components/table/TableUsers";
import { SearchBar } from "../components/ui/SearchBar";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";



export const ListUsers = () => {

  const { findUsers } = useAuth();
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [opts, setOpts] = useState({
    filter: "", 
    limit: 10,
    page: 0,
  });

  const handleSearch = (value) => {
    setOpts({ ...opts, filter: value, page: 0 });
  };


  const getUsers = async () => {
    try {
      const data = await findUsers(opts.filter, opts.page + 1, opts.limit);
      if (data) {
        setUsers(data.users);
        setCount(data.total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
    return () => {};
  }, [opts]);

  const columns = [
    { Header: 'Picture', accessor: 'gravatar' ,      Cell: ({ value }) => <img src={value} alt="Gravatar" style={{ width: '50px', height: '50px', borderRadius: '50%',objectFit:'cover' }} />,
},
    { Header: 'Name', accessor: 'name' },
    { Header: 'Email', accessor: 'email' },
    {
      Header: 'Action',
      accessor: 'id',
      Cell: ({ row }) => (
        <Link
        to={{
          pathname: "/panel-user",
          search: `?idUsuario=${encodeURIComponent(row.original.id)}`,
        }}
       
      >
        <button className="bg-primary px-5 py-1 rounded-full text-white hover:bg-gray-500">Ver más</button></Link>
        
      ),
    },
  ];

 
  
    

  return (
    <div className="w-full">
      <h3 className="font-quicksand text-xl">Gestión de Usuarios</h3>
      <SearchBar className="mt-8" onSearch={handleSearch}/>
      <TableUsers
        className={"flex items-center flex-col justify-center w-full h-full mt-[1rem]"}
        columns={columns}
        data={users}
        pageCount={Math.ceil(count / opts.limit)}
        pageIndex={opts.page}
        gotoPage={(page) => setOpts({ ...opts, page })}
        nextPage={() => setOpts({ ...opts, page: opts.page + 1 })}
        previousPage={() => setOpts({ ...opts, page: opts.page - 1 })}
        setPageSize={(pageSize) => setOpts({ ...opts, limit: pageSize, page: 0 })}
        pageSize={opts.limit}
      />
    </div>
  )}

  ListUsers.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
    pageCount: PropTypes.number,
    pageIndex: PropTypes.number,
    gotoPage: PropTypes.func,
    nextPage: PropTypes.func,
    previousPage: PropTypes.func,
    setPageSize: PropTypes.func,
    pageSize: PropTypes.number,
    value: PropTypes.string,
    row: PropTypes.array,
  };