import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FooterAdmin from '../../Components/Admin/Footer/FooterAdmin'
import AdminNavbar from '../../Components/Admin/Navbar/AdminNavbar'
import Sidebar from '../../Components/Admin/Sidebar/Sidebar'
import axios from 'axios';
import swal from 'sweetalert';

export default function ViewCustomer() {

    const params = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [status, setStatus] = useState();
    const [suspended, setSuspended] = useState();
    const [noOfMinutes, setNoOfMinutes] = useState();
    const [notification, setNotification] = useState();
    const [amount, setAmount] = useState('');
    const [advisorId, setAdvisorId] = useState('');
    const [advisors, setAdvisors] = useState();
    const [chatAmount,setChatAmount] = useState('');

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/clients/${params.id}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(result => {

            console.log("Info",result);

            setName(result.data.data.name);
            setUsername(result.data.data.username);
            setEmail(result.data.data.email);
            setNoOfMinutes(result.data.data.wallet_balance);
            setStatus(result.data.data.status);
            setSuspended(result.data.data.suspended);
            setNotification(result.data.notification);

            if(result.data.data.suspended === '1' || result.data.data.suspended === 1) {
                setActiveRadioSuspened1('check-active');
                setActiveRadioSuspened2('check-inactive');
            } 

            if(result.data.data.suspended === '0' || result.data.data.suspended === 0) {
                setActiveRadioSuspened1('check-inactive');
                setActiveRadioSuspened2('check-active');
            } 
            
        });

        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/advisors/list`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(result => {
            setAdvisors(result.data.data);
        });

    }, [params.id]);


    const handleSubmit = (e) => {

        e.preventDefault();

        const formData = {
            name: name,
            username: username,
            email: email,
            suspended: suspended,
            status: status,
            noOfMinutes: noOfMinutes,
            notification: notification,
        }

        axios.put(`${process.env.REACT_APP_BASE_URL}/admin/clients/${params.id}`, formData, {
            headers: {
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(res => {
            if (res.data.success === true) {
                swal("Data is updated successfully", "success");
                navigate(`/admin/customers`);

            } else if (res.data.error) {
                swal(res.data.error.message, "error");

            }
        });

    }

    const sendCreditLink = () => {

        if (amount === '' || !amount) {
            swal("Hello", "Please enter amount", "error");
            return false;
        }

        const formData = {
            amount: amount,
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/admin/clients/${params.id}/send-credit-link`, formData, {
            headers: {
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(res => {
            if (res.data.success === true) {
                swal("success", "Credit Link is sent successfully", "success");
                //navigate(`/admin/customers`);

            } else if (res.data.error) {
                swal(res.data.error.message, "error");

            }
        });
    }

    const sendChatLink = () => {
        if (advisorId === '' || !advisorId) {
            swal("Hello", "Please enter Advisor Id", "error");
            return false;
        } else if(chatAmount === '') {
            swal("Hello", "Please enter Chat Amount", "error");
            return false;
        }

        const formData = {
            advisor_id: advisorId,
            client_id: params.id,
            chatAmount: chatAmount
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/admin/clients/${params.id}/send-chat-link`, formData, {
            headers: {
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(res => {
            if (res.data.success === true) {
                swal("success", "Chat Link is sent successfully", "success");

            } else if (res.data.error) {
                swal(res.data.error.message, "error");

            }
        });
    }

    const [activeRadioSuspened1, setActiveRadioSuspened1] = useState('');
    const [activeRadioSuspened2, setActiveRadioSuspened2] = useState('');

    const SuspendedChange = (e) => {
        if(e.target.value === '1') {
            setActiveRadioSuspened1('check-active');
            setActiveRadioSuspened2('check-inactive');
            setSuspended(e.target.value);
        } 
        if(e.target.value === '0') {
            setActiveRadioSuspened1('check-inactive');
            setActiveRadioSuspened2('check-active');
            setSuspended(e.target.value);
        }   
    }


    return (
        <div className="relative md:ml-64 bg-default-skin">
            <Sidebar />
            <AdminNavbar />
            <div className="flex flex-wrap min600">
                <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 gridstyle">
                    <h1 className='text-2xl text-black font-bold mb-3'>Edit Customer</h1>
                     <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item" role="presentation">
                            <a id="customer-tab" className="nav-link active" data-toggle="tab" href="#tab-customer" aria-selected="true" role="tab">Customer Details</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a id="credit-tab" className="nav-link" data-toggle="tab" href="#tab-credit" aria-selected="false" role="tab">Credit Amount</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a id="chat-tab" className="nav-link" data-toggle="tab" href="#tab-chat" aria-selected="false" role="tab">Chat Link</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a id="notification-tab" className="nav-link" data-toggle="tab" href="#tab-notification" aria-selected="false" role="tab">Notification</a>
                        </li>
                    </ul>
                    <form className='mt-4 shadow-md p-4 rounded bg-white' onSubmit={handleSubmit}> 
                        <div className="tab-content">
                            <div id="tab-customer" className="tab-pane active show" role="tab-panel" aria-labelledby="customer-tab">
                                <div className='row'>
                                    {/* <div className='col-sm-4'>
                                        <div className="mb-6">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Customer Name</label>
                                            <input type="text" id="customerName" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                    </div> */}
                                    <div className='col-sm-4 col-xs-6'>
                                        <div className="mb-6">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Username</label>
                                            <input type="text" id="userName" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                    </div>
                                    <div className='col-sm-4 col-xs-6'>
                                        <div className="mb-6">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                                            <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                    </div>
                                    <div className='col-sm-4 col-xs-6'>
                                        <div className="mb-6">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Date of Birth</label>
                                            <input type="date" id="birthDate" defaultValue='20/06/1997' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                    </div>
                                    <div className='col-sm-4 col-xs-6'>
                                        <div className="mb-6">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Amount in Wallet</label>
                                            <input type="text" id="walletAmount" value={parseFloat(noOfMinutes).toFixed(2)} onChange={(e) => setNoOfMinutes(e.target.value)} placeholder='Amount' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly/>
                                        </div>
                                    </div>
                                    <div className='col-sm-4 col-xs-6'>
                                        <div className="mb-6">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Status</label>
                                            <select id="availability" value={status} onChange={(e) => setStatus(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option value=''>Please select</option>
                                                <option value="1">Enable</option>
                                                <option value="0">Disable</option>
                                            </select>
                                        </div>
                                    </div>
                            
                                    <div className='col-sm-4 col-xs-6'>
                                            <div className="mb-6">
                                                <label className="block mb-3 text-sm font-medium text-gray-900 dark:text-gray-300">Suspend client</label>
                                                <ul className="list-inline usertype">
                                                    <li className="list-inline-item">
                                                        <div className="radio">
                                                            <label>
                                                            <input type="radio" name='show-homepage' className="status-type" value="1" onChange={SuspendedChange} id="show-homepage" />
                                                                <span className={activeRadioSuspened1}>YES</span>
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <div className="radio">
                                                            <label>
                                                            <input type="radio" name='show-homepage' className="status-type ml-2" value="0" onChange={SuspendedChange} id="show-homepage2" />
                                                                <span className={activeRadioSuspened2}>NO</span>
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                    <div className='col-sm-12'>
                                        <div className='flex'>
                                            <button type="submit" className="text-white bg-package-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Submit</button>
                                            <Link to='/admin/customers' className="text-white bg-dark font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center ml-2">Go Back</Link>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                            <div id="tab-credit" className="tab-pane" role="tab-panel" aria-labelledby="credit-tab">
                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Amount available in customer's wallet: <strong style={{color: "#b7292d"}}>${parseFloat(noOfMinutes).toFixed(2)}</strong></label>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Send Amount</label>
                                    <input type="text" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Amount' style={{maxWidth: "300px"}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    <button type="button" onClick={sendCreditLink} className="mt-4 text-white bg-package-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Send Credit Amount Link</button>
                                </div> 
                            </div>
                            <div id="tab-chat" className="tab-pane" role="tab-panel" aria-labelledby="chat-tab">
                                <div className="mb-3">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Send Chat Link?</label>
                                    <select id="advisorId" value={advisorId} onChange={(e) => setAdvisorId(e.target.value)} style={{maxWidth: "300px"}} placeholder='Adviosr Id' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value='' >Please Select Advisor</option>
                                        {advisors && advisors.map((advisor, index) => (
                                            <option key={index} value={advisor._id} >{advisor.username}</option>
                                        ))}
                                    </select>  
                                </div>
                                <div className='mb-4'>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Amount</label>
                                    <input type='text'  onChange={(e) => setChatAmount(e.target.value)} style={{maxWidth: "300px"}} className='className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"'/> 
                                </div>
                                <button type="button" onClick={sendChatLink} className="text-white bg-package-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Send</button>
                            </div>
                            <div id="tab-notification" className="tab-pane" role="tab-panel" aria-labelledby="notification-tab">
                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Send notification</label>
                                    <textarea id="Message" rows="3" onChange={(e) => setNotification(e.target.value)} defaultValue={notification} className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Your message'></textarea>
                                    <button type="submit" className="mt-3 text-white bg-package-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Send</button>
                                </div>
                            </div>
                        </div>
                    </form>    
                </div>
            </div>
            <FooterAdmin />
        </div>
    )
}

