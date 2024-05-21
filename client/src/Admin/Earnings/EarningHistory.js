import React, { useState, useEffect } from 'react'
import SubscriptionFilter from '../../Components/Admin/Filter/SubscriptionFilter'
import AdminNavbar from '../../Components/Admin/Navbar/AdminNavbar'
import Sidebar from '../../Components/Admin/Sidebar/Sidebar'
import axios from 'axios';
import ReactPaginate from "react-paginate";
import * as moment from 'moment';

import { CSVLink } from 'react-csv';

export default function EarningHistory() {

    const [details, setDetails] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [excelData, setExcelData] = useState([]);
    let limit = 10;

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/earnings?page=${page}&size=${limit}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(result => {
            setDetails(result.data.data);
            setExcelData(result.data.data);
            setPageCount(Math.ceil(parseInt(result.data.total) / parseInt(result.data.perPage)));
            setPage(result.data.page);
        })
    }, [limit, page]);


    const getCsvData = () => {
        const csvData = [['Transaction ID', 'User', 'Email', 'Amount', 'Date', 'Stripe Id' ,'Status']];
        let i;
        for (i = 0; i < excelData.length; i += 1) {
            if ((excelData[i].transaction_id) && (excelData[i].client && excelData[i].client.username)) {
            csvData.push([`${excelData[i].transaction_id}`,`${excelData[i].client.username}`,`${excelData[i].client.email}`, `${excelData[i].amount}`, moment(`${excelData[i].createdAt}`).format("DD-MM-YYYY"), `${excelData[i].advisor_stripe_id}`, `${excelData[i].status}`]);
        } else {
            continue;
        }
        }
        return csvData;
    };

    const paginationData = async (currentPage) => {
        const res = await fetch(
            `${process.env.REACT_APP_BASE_URL}/admin/earnings?size=${limit}&page=${currentPage}`, {
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

    const getFilterData = ({ client, advisor, created_date }) => {

        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/earnings?page=1&filter_client=${client}&filter_advisor=${advisor}&filter_created_at=${created_date}`, {
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

    return (
        <div className="relative md:ml-64 bg-default-skin">
            <Sidebar />
            <AdminNavbar />
            <div className="flex flex-wrap min600">
                <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 gridstyle">
                    <h1 className='text-2xl text-black font-bold mb-3'>Earning History</h1>
                    {/* <CSVLink filename="transactions.csv" className="min-150 text-white bg-hotel-maroon hover:bg-hotel-maroon focus:ring-4 focus:outline-none focus:bg-hotel-maroon font-medium rounded text-sm p-2.5 text-center items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" data={getCsvData()}>Export as CSV</CSVLink> */}
                    <SubscriptionFilter onSubmit={getFilterData} />
                    
                    <div className='table-responsive'>
                        <table className="table bg-white table-striped">
                            <thead>
                                <tr>
                                    <th className='text-center'>ID</th>
                                    <th>Chat Date</th>
                                    <th>Client</th>
                                    <th>Advisor</th>
                                    <th>Amount</th>
                                    <th>Commission Received</th>
                                </tr>
                            </thead>
                            <tbody>
                                {details && details.map((item, index) => (
                                    <tr key={index}>
                                        <td className='text-center'>{index+1}</td>
                                        <td>{item.chat_date}</td>
                                        <td>{item.client ? item.client.username : ''}</td>
                                        <td>{item.advisor ? item.advisor.username : ''}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.app_fee}</td>
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