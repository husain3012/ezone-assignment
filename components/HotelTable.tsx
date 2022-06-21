import React, { useState, useRef } from "react";
import { useTable, usePagination } from "react-table";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import { Bars } from "react-loader-spinner";
import { BsChevronLeft, BsChevronRight, BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
// import { IHotel } from "../interfaces";

function Table({ columns, data, fetchData, loading, pageCount: controlledPageCount }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
    },
    usePagination
  );

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  // Render the UI for your table
  return (
    <div className=" flex flex-col items-center m-auto  ">
      {loading && (
        <div className="absolute flex items-center content-center m-auto mt-48 ">
          <Bars color="blue" />
        </div>
      )}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, idx) => (
                <th key={idx} className="bg-slate-400 border-2 p-1 sm:p-2 border-black" {...column.getHeaderProps()}>
                  {column.render("Header")}
                  {/* <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span> */}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody style={{ opacity: loading ? 0.5 : 1 }} {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={i} className="p-3 " {...row.getRowProps()}>
                {row.cells.map((cell, idx) => {
                  return (
                    <td key={idx} className="border-2 p-1 sm:p-2 w-6 md:w-auto" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
          <tr>
            <td>
              Showing {page.length} of ~{controlledPageCount * pageSize} results
            </td>
          </tr>
        </tbody>
      </table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className="w-full bg-slate-200 p-2 rounded flex">
        <button
          className="bg-black text-white p-1 mx-1 hover:bg-blue-800 transition-all cursor-pointer disabled:bg-slate-400 disabled:cursor-not-allowed rounded"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          <BsChevronDoubleLeft />
        </button>{" "}
        <button
          className="bg-black text-white p-1 mx-1 hover:bg-blue-800 transition-all cursor-pointer disabled:bg-slate-400 disabled:cursor-not-allowed rounded"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <BsChevronLeft />
        </button>{" "}
        <button
          className="bg-black text-white p-1 mx-1 hover:bg-blue-800 transition-all cursor-pointer disabled:bg-slate-400 disabled:cursor-not-allowed rounded"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <BsChevronRight />
        </button>{" "}
        <button
          className="bg-black text-white p-1 mx-1 hover:bg-blue-800 transition-all cursor-pointer disabled:bg-slate-400 disabled:cursor-not-allowed rounded"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          <BsChevronDoubleRight />
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          className="ml-auto"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 50, 100, 500].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

const HotelTable = ({ initialData, count }) => {
  const [data, setData] = useState([...initialData]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const fetchIdRef = useRef(0);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const columns = React.useMemo(() => {
    const cols = [
      {
        Header: "Hotels",
        columns: [
          {
            Header: "Name",
            accessor: "name",
          },

          {
            Header: "City",
            accessor: "city",
          },
          {
            Header: "Country",
            accessor: "country",
          },
          {
            Header: "Url",
            accessor: "url",
            Cell: ({ cell }) => (
              <a href={cell} target="_blank" rel="noopener noreferrer" className="text-blue-700">
                Visit
              </a>
            ),
          },
        ],
      },
    ];
    if (isDesktopOrLaptop) {
      cols[0].columns.push({
        Header: "Trip Advisor Rating",
        accessor: "tripadvisorRating",
      });
    }
    return cols;
  }, [isDesktopOrLaptop]);

  const fetchData = React.useCallback(
    async ({ pageSize, pageIndex }) => {
      const fetchId = ++fetchIdRef.current;
      setLoading(true);
      if (fetchId === fetchIdRef.current) {
        const response = await axios.get("/api/hotels", {
          params: {
            pageSize,
            pageIndex,
          },
        });

        setData(response.data);
        setPageCount(Math.ceil(count / pageSize));
        setLoading(false);
      }

      // Set the loading state
    },
    [count]
  );

  return <Table columns={columns} data={data} fetchData={fetchData} loading={loading} pageCount={pageCount} />;
};

export default HotelTable;
