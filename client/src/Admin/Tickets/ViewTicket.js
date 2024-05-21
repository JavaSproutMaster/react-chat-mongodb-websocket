import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FooterAdmin from '../../Components/Admin/Footer/FooterAdmin'
import AdminNavbar from '../../Components/Admin/Navbar/AdminNavbar'
import Sidebar from '../../Components/Admin/Sidebar/Sidebar'
import axios from 'axios';
import swal from 'sweetalert';
import * as moment from 'moment';

export default function ViewTicket() {
    const params = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [status, setStatus] = useState();
    const [email, setEmail] = useState();
    const [issue, setIssue] = useState();
    const [solution, setSolution] = useState();
    const [createdAt, setCreatedAt] = useState();
    

    

    useEffect(() => {
        function getDetailsById() {

            axios.get(`${process.env.REACT_APP_BASE_URL}/admin/tickets/${params.id}`, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ` + localStorage.getItem('accessToken')
                },
            }).then(result => {
                setName(result.data.data.name);
                setUsername(result.data.data.username);
                setEmail(result.data.data.email);
                setIssue(result.data.data.issue);
                setStatus(result.data.data.status);
                setSolution(result.data.data.solution);
                setCreatedAt(result.data.data.createdAt);
            });
    
        }
        getDetailsById();
        
    }, [params.id]);

    
    const handleSubmit = (e) => {

        e.preventDefault();

        const formData = {
            solution: solution,
            status:status
        }

        axios.put(`${process.env.REACT_APP_BASE_URL}/admin/tickets/${params.id}`, formData, {
            headers: {
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(res => {
            if (res.data.success === true) {
                swal("Data is updated successfully", "success");
                navigate(`/admin/tickets`);

            } else if (res.data.error) {
                swal(res.data.error.message, "error");

            }
        });

    }

    return (
        <div className="relative md:ml-64 bg-default-skin">
            <Sidebar />
            <AdminNavbar />
            <div className="flex flex-wrap min600">
                <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 gridstyle">
                    <h1 className='text-2xl text-black font-bold mb-3'>View Ticket</h1>
                    <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item" role="presentation">
                            <a id="ticketDetails-tab" className="nav-link active" data-toggle="tab" href="#tab-ticketDetails" aria-selected="true" role="tab">Ticket Details</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a id="notification-tab" className="nav-link" data-toggle="tab" href="#tab-notification" aria-selected="false" role="tab">Notification</a>
                        </li>
                    </ul>
                    <form className='mt-4 shadow-md p-4 rounded bg-white' onSubmit={handleSubmit}>
                        <div className="tab-content">
                            <div id="tab-ticketDetails" className="tab-pane active show" role="tab-panel" aria-labelledby="ticketDetails-tab">
                                <div className='row'>
                                    <div className='col-sm-3'>
                                        <div className="mb-6">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Raised Date</label>
                                            <input type="text" id="raisedDate" disabled value={moment(createdAt).format("DD-MM-YYYY")} className="max193 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                    </div>
                                    <div className='col-sm-3'>
                                        <div className="mb-6">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
                                            <input type="text" id="ticketName" disabled value={name} className="max193 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                    </div>
                                    {/* <div className='col-sm-3'>
                                        <div className="mb-6">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Username</label>
                                            <input type="text" id="ticketUsername" disabled value={username} className="max193 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                    </div> */}
                                    <div className='col-sm-3'>
                                        <div className="mb-6">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                                            <input type="text" id="ticketEmail" disabled value={email} className="max193 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Issue</label>
                                    <textarea disabled defaultValue={issue} id="ticketIssue" rows="7" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
                                </div>
                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Status</label>
                                    <select id="availability" value={status} onChange={(e) => setStatus(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value=''>Please select</option>
                                        <option value="1">Solved</option>
                                        <option value="0">Pending</option>
                                    </select>
                                </div>
                                <div className='flex'>
                                    <button type="submit" className="text-white bg-package-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Save</button>
                                    <Link to='/admin/tickets' className="text-white bg-dark font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center ml-2">Go Back</Link>
                                </div>
                            </div>
                            <div id="tab-notification" className="tab-pane" role="tab-panel" aria-labelledby="notification-tab">
                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Message</label>
                                    <textarea id="ticketMessage" rows="3" defaultValue={solution} onChange={(e) => setSolution(e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Your message'></textarea>
                                </div>
                                <button type="submit" className="text-white bg-package-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Send Notification</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <FooterAdmin />
        </div>
    )
}
