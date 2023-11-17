import { InputNumber, Select } from "antd";
import PropTypes from "prop-types";
import {
  RiArrowLeftDoubleLine,
  RiArrowLeftSLine,
  RiArrowRightDoubleLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import { useTable, usePagination } from "react-table";

export const TableUsers = ({
  columns,
  data,
  pageCount,
  pageIndex,
  gotoPage,
  nextPage,
  previousPage,
  setPageSize,
  pageSize,
  className,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
   
    rows,
    prepareRow,
    state: { pageIndex: tablePageIndex, pageSize: tablePageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex, pageSize },
    },
    usePagination
  );

  return (
    <div className={className}>
      <table {...getTableProps()} className="table w-full">
        {/* <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} key={column.id}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead> */}
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                key={row.index}
                className="border-b rounded-full "
              >
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    key={cell.id}
                    className=" rounded-full px-4 py-1 text-center"
                  >
                    <div
                      className="object-contain"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {cell.render("Cell")}
                    </div>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination flex items-center justify-center my-10 w-full">
        <button onClick={() => gotoPage(0)} disabled={tablePageIndex === 0}>
          <RiArrowLeftDoubleLine className="text-3xl rounded-full bg-primary text-white mr-5" />
        </button>{" "}
        <button
          onClick={() => previousPage()}
          disabled={!tablePageSize || tablePageIndex === 0}
        >
          <RiArrowLeftSLine className="text-2xl rounded-full bg-gray-500 text-white mx-2" />
        </button>{" "}
        <button
          onClick={() => nextPage()}
          disabled={!tablePageSize || tablePageIndex >= pageCount - 1}
        >
          <RiArrowRightSLine className="text-2xl rounded-full bg-gray-500 text-white mx-2"/>
        </button>{" "}
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!tablePageSize || tablePageIndex >= pageCount - 1}
        >
          <RiArrowRightDoubleLine className="text-3xl rounded-full bg-primary text-white mx-5" />
        </button>{" "}
        <span>
          Página{" "}
          <strong>
            {tablePageIndex + 1} de {pageCount}
          </strong>{"   "}
        </span>
        <span className="px-5">|</span>
        <span  >
           
           Ir a página:{" "}
          <InputNumber className="ml-5" min={1} max={10} defaultValue={pageIndex + 1} onChange={(e)=>{
            const page = e ? Number(e) - 1 : 0;
            gotoPage(page);
          }} />
          {/* <input
            type="number"
            value={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "50px" }}
          /> */}
        </span>{" "}
        <span className="px-5">Items por página: </span>
        <Select
          className="font-quicksand"
          defaultValue={pageSize}
          style={{ width: 120 }}
          onChange={(value) => {
            setPageSize(Number(value));
            
          }}
          options={[
            { value: 10 },
            { value: 20 },
            { value: 50 },
          ]}
        />
      
      </div>
    </div>
  );
};

TableUsers.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  pageCount: PropTypes.number.isRequired,
  pageIndex: PropTypes.number.isRequired,
  gotoPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  setPageSize: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  className: PropTypes.string,
};
