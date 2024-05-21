import React, { useState, useEffect } from 'react'
import AdminNavbar from '../../Components/Admin/Navbar/AdminNavbar'
import Sidebar from '../../Components/Admin/Sidebar/Sidebar'
import { Link } from 'react-router-dom'
import UserFilter from '../../Components/Admin/Filter/UserFilter'
import axios from 'axios';
import swal from 'sweetalert';
import ReactPaginate from "react-paginate";
import * as moment from 'moment';

export default function Advisor() {
    const [details, setDetails] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    const [page, setPage] = useState(1);
    let limit = 10;

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/advisors?page=${page}&size=${limit}`, {
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
            `${process.env.REACT_APP_BASE_URL}/admin/advisors?size=${limit}&page=` + currentPage, {
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

        if (window.confirm("Are you sure you want to delete?")){
            axios.delete(`${process.env.REACT_APP_BASE_URL}/admin/advisors/${id}`, {
                headers: {
                'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ` + localStorage.getItem('accessToken')
                },
            }).then(result => {
                swal("Success", "Data is deleted", "success");
                setTimeout(() => {
                    window.location = '/admin/advisors';
                }, 1000);
            })
        }
    }

    const getFilterData = ({ status, name, email, username, created_date, created_date_to }) => {

        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/advisors?filter_status=${status}&page=1&filter_name=${name}&filter_email=${email}&filter_username=${username}&filter_created_from=${created_date}&filter_created_to=${created_date_to}`, {
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
                                <h1 className='text-2xl text-black font-bold mb-3'>Advisors</h1>
                            </div>
                            <div className='mt-4'>
                                <Link to='/admin/add-advisor' type="submit" className="text-white float-right bg-success font-medium rounded px-5 py-2.5 text-center">Add Advisor</Link>
                            </div>
                        </div>
                        <UserFilter onSubmit={getFilterData} />
                        <div className='table-responsive'>
                            <table className="table bg-white table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Member Since</th>
                                        <th>Name</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Email Status</th>
                                        <th>Status</th>
                                        <th className='text-center'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {details && details.map((item, index) => (
                                        <tr key={index}>
                                            <td className='text-center'>{index + 1}</td>
                                            <td>{moment(item.createdAt).format("YYYY-MM-DD")}</td>
                                            <td>{item.name}</td>
                                            <td>{item.username}</td>
                                            <td>{item.email}</td>
                                            <td>{item.status === 0 ? 'Not Verified' : 'Verified'}</td>

                                            <td>{item.approved === 0 ? 'Not Approved' : 'Approved'}</td>
                                            <td className='text-center flex'>
                                                <Link to={`/admin/view-advisor/${item._id}`} className="focus:outline-none text-white bg-package-maroon font-medium rounded-lg text-sm p-2.5 mr-2">
                                                    <i className="fas fa-pencil"></i>
                                                </Link>
                                                <Link to={`/admin/advisor-information/${item._id}`} className='focus:outline-none text-white bg-hotel-maroon font-medium rounded-lg text-sm p-2.5 mr-2'>
                                                    <i className='fa-solid fa-eye'></i>
                                                </Link>
                                                <button type='button' onClick={() => HandleDelete(item._id)} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                                    <i className="fas fa-trash"></i>
                                                </button>

                                            </td>
                                        </tr>
                                    ))}
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