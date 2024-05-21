import React, { useState, useEffect } from 'react'
import AdminNavbar from '../../Components/Admin/Navbar/AdminNavbar'
import Sidebar from '../../Components/Admin/Sidebar/Sidebar'
import { Link } from 'react-router-dom'
import ReviewFilter from '../../Components/Admin/Filter/ReviewFilter'
import axios from 'axios';
import swal from 'sweetalert';
import ReactPaginate from "react-paginate";
import * as moment from 'moment';

export default function Reviews() {
    const [details, setDetails] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    const [page, setPage] = useState(1);
    let limit = 10;

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/reviews?page=1&size=${limit}`, {
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
    }, [limit,page])

    const paginationData = async (currentPage) => {
        const res = await fetch(
            `${process.env.REACT_APP_BASE_URL}/admin/reviews?size=${limit}&page=` + currentPage, {
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

    const HandleDelete = (id) => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}/admin/reviews/${id}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(result => {
            swal("Success", "Data is deleted", "success");
            setTimeout(() => {
                window.location = '/admin/customers';
            }, 1000);
        })
    }

    const getFilterData = ({ status, clientName, advisorName, created_date, created_date_to }) => {

        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/reviews?filter_status=${status}&size=${limit}&page=${page}&filter_client=${clientName}&filter_advisor=${advisorName}&filter_created_from=${created_date}&filter_created_to=${created_date_to}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(result => {
            setDetails(result.data.data);
            setpageCount(Math.ceil(result.data.total / result.data.perPage));
            setPage(result.data.page);
        });
    }


    return (
        <div className="relative md:ml-64 bg-default-skin">
            <Sidebar />
            <AdminNavbar />
            <div className="flex flex-wrap min600">
                <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 gridstyle">
                    <div className="grid grid-cols-2 gap-4 mb-2">
                        <div className='mt-4'>
                            <h1 className='text-2xl text-black font-bold mb-3'>Reviews</h1>
                        </div>
                        <div className='mt-4'>
                            <Link to='/admin/add-review' type="submit" className="text-white float-right bg-success font-medium rounded px-5 py-2.5 text-center">Add Review</Link>
                        </div>
                    </div>
                    <ReviewFilter onSubmit={getFilterData} />
                    <div className='table-responsive mt-3'>
                        <table className="table bg-white table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date Added</th>
                                    <th>Advisor</th>
                                    <th>Customer</th>
                                    <th>Rating</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {details && details.map((item, index) => (
                                    <tr key={index}>
                                        <td className='text-center'>{index + 1}</td>
                                        <td>{moment(item.createdAt).format("YYYY-MM-DD")}</td>
                                        <td>{item.advisor_name}</td>
                                        <td>{item.client_name}</td>
                                        <td>

                                        <div className="form-check form-check-inline ratingreview">
                                          { item.rating === 5 ? 
                                          
                                            <div className="items-center">
                                                <i className="bi bi-emoji-smile-fill"></i>
                                            </div>
                                          : 
                                          
                                          <div className="items-center">
                                                <i className="bi bi-emoji-frown"></i>
                                            </div> 
                                          }
                                        </div>


                                        </td>
                                        <td>{item.status === 0 ? 'Disable' : 'Enable'}</td>
                                        <td className='text-center flex'>
                                            <Link to={`/admin/edit-review/${item._id}`} className="focus:outline-none text-white bg-package-maroon font-medium rounded-lg text-sm p-2.5 mr-2">
                                                <i className="fas fa-pencil"></i>
                                            </Link>
                                            <button type='button' onClick={() => HandleDelete(item._id)} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                                <i className="fas fa-trash"></i>
                                            </button>

                                        </td>
                                    </tr>
                                ))}

                                {(!details || details.length === 0) &&
                                    <tr>
                                        <td className='border border-slate-300 text-center' colSpan="7">No data Found</td>
                                    </tr>

                                }
                            </tbody>
                        </table>
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
