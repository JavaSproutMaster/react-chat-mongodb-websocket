import React, { useState, useEffect } from 'react'
import SubscriptionFilter from '../../Components/Admin/Filter/SubscriptionFilter'
import AdminNavbar from '../../Components/Admin/Navbar/AdminNavbar'
import Sidebar from '../../Components/Admin/Sidebar/Sidebar'
import axios from 'axios';
import ReactPaginate from "react-paginate";
import * as moment from 'moment';
import swal from 'sweetalert';

export default function TransactionHistory() {

    const [details, setDetails] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    let limit = 10;

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/payments/payouts?page=${page}&size=${limit}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(result => {
            setDetails(result.data.data);
            setPageCount(Math.ceil(parseInt(result.data.total) / parseInt(result.data.perPage)));
            setPage(result.data.page);
        })
    }, [limit, page])

    const paginationData = async (currentPage) => {
        const res = await fetch(
            `${process.env.REACT_APP_BASE_URL}/admin/payments/payouts?size=${limit}&page=${currentPage}`, {
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

    const getFilterData = ({ client, advisor, created_date, created_date_to }) => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/payments/payouts?page=1&filter_client=${client}&filter_advisor=${advisor}&filter_created_from=${created_date}&filter_created_to=${created_date_to}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(result => {
            setDetails(result.data.data);
            setPageCount(Math.ceil(result.data.total / result.data.perPage));
            setPage(result.data.page);
        });
    }

    const CreatePayout = (pid,advisorId,stripe_id,amount,username) => {

        if (window.confirm("Are you sure to generate payout?")) {
            // Payout
            const payout_data = {
                'amount': amount,
                'advisor_id': advisorId,
                "connect_id": stripe_id,
                "username":  username,
                "pid": pid,
            }

            axios.post(`${process.env.REACT_APP_BASE_URL}/advisor/earnings/adminpayout`, payout_data, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
            }).then(result => {
                swal("success",'Payout has been processed',"success");
            }).catch(err => {
                swal("Hello",err.response.data.error.message,"error");
            });
            // Payout
        } 
    }

    return (
        <div className="relative md:ml-64 bg-default-skin">
            <Sidebar />
            <AdminNavbar />
            <div className="flex flex-wrap min600">
                <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 gridstyle">
                    <h1 className='text-2xl text-black font-bold mb-3'>Payouts</h1>
                    <SubscriptionFilter onSubmit={getFilterData} />
                    <div className='table-responsive'>
                        <table className="table bg-white table-striped">
                            <thead>
                                <tr>
                                    <th className='text-center'>ID</th>
                                    <th>Transaction ID</th>
                                    <th>Advisor Username</th>
                                    <th>Email</th>
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th>Created at</th>
                                    <th>Stripe ID</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {details && details.map((item, index) => (
                                    <tr key={index}>
                                       <td className='text-center'>{index+1}</td>
                                       <td>{item.transaction_id}</td>
                                       <td>{item.advisor ? item.advisor.username : ''}</td>
                                       <td>{item.advisor ? item.advisor.email : ''}</td>
                                       <td>{item.description}</td>
                                       <td>{item.amount}</td>
                                       <td>{moment(item.createdAt).format("DD-MM-YYYY")}</td>
                                       <td>{item.advisor_stripe_id}</td>
                                       <td>
                                        {
                                            item.status === 'generate' ? 
                                            <>
                                              <button type="button" onClick={() => CreatePayout(item._id,item.advisor._id,item.advisor.stripe_customer_id,item.amount,item.advisor.username)} className="min-150 text-white bg-hotel-maroon hover:bg-hotel-maroon focus:ring-4 focus:outline-none focus:bg-hotel-maroon font-medium rounded text-sm p-2.5 text-center items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                                 Create Payout
                                               </button>
                                            </>
                                            : 
                                            item.status
                                        }
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