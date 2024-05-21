import React, { useState, useEffect } from 'react'
import AdminNavbar from '../../Components/Admin/Navbar/AdminNavbar'
import Sidebar from '../../Components/Admin/Sidebar/Sidebar'
import { Link } from 'react-router-dom'
import axios from 'axios';
import ReactPaginate from "react-paginate";
import * as moment from 'moment';

export default function Tickets() {

  const [details, setDetails] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  const [page, setPage] = useState(1);
  let limit = 10;

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/admin/tickets?page=${page}&size=${limit}`, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + localStorage.getItem('accessToken')
      },
    }).then(result => {
      setDetails(result.data.data);
      setpageCount(Math.ceil(parseInt(result.data.total) / parseInt(result.data.perPage)));
      setPage(result.data.page);
    })
  }, [limit, page])

  const paginationData = async (currentPage) => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/admin/tickets?size=${limit}&page=` + currentPage, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + localStorage.getItem('accessToken')
      },
    }
    );
    return await res.json();
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    const result = await paginationData(currentPage);
    setDetails(result.data);
  };


  return (
    <div className="relative md:ml-64 bg-default-skin">
      <Sidebar />
      <AdminNavbar />
      <div className="flex flex-wrap min600 raisedTC">
          <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 gridstyle">
            <h1 className='text-2xl text-black font-bold mb-3'>Tickets Raised</h1>


            <div className='latestUsers'>
              <h2 className="text-2xl font-bold mt-8 mb-2">Recent Tickets</h2>
              <div className='table-responsive'>
                <table className="table bg-white table-striped recTickets">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Raised Date</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>

                    {details && details.map((item, index) => (
                      <tr key={index}>
                        <td className='text-left'>{index+1}</td>
                        <td>{moment(item.createdAt).format("YYYY-MM-DD")}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        {item.status === 0 ? (<td className="text-red text-center">Pending</td>) : (<td className='text-package-maroon text-center'>Solved</td>)}

                        <td className='text-center'>
                          <Link to={`/admin/view-ticket/${item._id}`} className="lh40 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                            <i className="fas fa-eye"></i>
                          </Link>
                        </td>
                      </tr>
                    ))}

                    {(!details || details.length === 0) &&
                      <tr>
                        <td className='border border-slate-300 text-center' colSpan="8">No data Found</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>


            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"pagination justify-content-center"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={"active"}
            />
          </div>
      </div>
    </div>
  )
}
