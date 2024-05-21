import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FooterAdmin from '../../Components/Admin/Footer/FooterAdmin'
import AdminNavbar from '../../Components/Admin/Navbar/AdminNavbar'
import Sidebar from '../../Components/Admin/Sidebar/Sidebar'
import axios from 'axios';
import swal from 'sweetalert';

export default function ViewAdvisor() {

    const params = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const [position, setPosition] = useState('');
    const [approved, setApproved] = useState('');
    const [approvedEmail, setApprovedEmail] = useState(0);
    const [category, setCategory] = useState('');
    const [ratePerMin, setRatePerMin] = useState('');
    const [showOnHome, setShowOnHome] = useState('');
    const [minChatMinutes, setMinChatMinutes] = useState('');
    const [commissionRate, setCommissionRate] = useState('');
    const [notification, setNotification] = useState('');
    const [availFreeMins, setAvailFreeMins] = useState('');
    const [suspended, setSuspended] = useState('');
    const [dob, setDob] = useState('');
    const [categories, setCategories] = useState('');


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/advisors/${params.id}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(result => {
            setName(result.data.data.name);
            setUsername(result.data.data.username);
            setEmail(result.data.data.email);
            setRatePerMin(result.data.data.rate_per_min);
            setMinChatMinutes(result.data.data.min_chat_minutes);
            setCommissionRate(result.data.data.commission_rate);
            setStatus(result.data.data.status);
            setCategory(result.data.data.category);
            setApproved(result.data.data.approved);
            setShowOnHome(result.data.data.show_on_home);
            setPosition(result.data.data.position);
            setSuspended(result.data.data.suspended);
            setNotification(result.data.data.notification);
            setAvailFreeMins(result.data.data.avail_free_mins);
            setDob(result.data.data.dob);

            if(result.data.data.suspended === '1' || result.data.data.suspended === 1) {
                setActiveRadioSuspened1('check-active');
                setActiveRadioSuspened2('check-inactive');
            } 
            if(result.data.data.suspended === '0' || result.data.data.suspended === 0) {
                setActiveRadioSuspened1('check-inactive');
                setActiveRadioSuspened2('check-active');
            } 

            if(result.data.data.show_on_home === '1' || result.data.data.show_on_home === 1) {
                setActiveRadioShowHome1('check-active');
                setActiveRadioShowHome2('check-inactive');
            } 
            if(result.data.data.show_on_home === '0' || result.data.data.show_on_home === 0) {
                setActiveRadioShowHome1('check-inactive');
                setActiveRadioShowHome2('check-active');
            } 

        });


        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/categories`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(result => {
            setCategories(result.data.data);
        });


    }, [params.id]);

    const handleSubmit = (e) => {

        e.preventDefault();

        const formData = {
            name: name,
            username: username,
            email: email,
            status: status,
            approved: approved,
            category: category,
            suspended: suspended,
            rate_per_min: ratePerMin,
            show_on_home: showOnHome,
            position: position,
            commission_rate: commissionRate,
            notification: notification,
            avail_free_mins: availFreeMins,
            min_chat_minutes: minChatMinutes,
            approvedEmail: approvedEmail,
        }

        axios.put(`${process.env.REACT_APP_BASE_URL}/admin/advisors/${params.id}`, formData, {
            headers: {
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(res => {
            if (res.data.success === true) {
                swal("success","Data is updated successfully", "success");
                navigate(`/admin/advisors`);

            } else if (res.data.error) {
                swal("error",res.data.error.message, "error");

            }
        });
    }

    const [activeRadioSuspened1, setActiveRadioSuspened1] = useState('');
    const [activeRadioSuspened2, setActiveRadioSuspened2] = useState('');

    const [activeRadioShowHome1, setActiveRadioShowHome1] = useState('');
    const [activeRadioShowHome2, setActiveRadioShowHome2] = useState('');

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

    const ShowhomeChange = (e) => {
        if(e.target.value === '1') {
            setActiveRadioShowHome1('check-active');
            setActiveRadioShowHome2('check-inactive');
            setShowOnHome(e.target.value);
        } 
        if(e.target.value === '0') {
            setActiveRadioShowHome1('check-inactive');
            setActiveRadioShowHome2('check-active');
            setShowOnHome(e.target.value);
        }   
    }

   const handleApproved = (e) => {
     setApproved(e.target.value);
     setApprovedEmail(1);
   }

    return (
        <div className="relative md:ml-64 bg-default-skin">
            <Sidebar />
            <AdminNavbar />
            <div className="flex flex-wrap min600">
                    <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 gridstyle">
                        <h1 className='text-2xl text-black font-bold mb-3'>Edit Advisor</h1>
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item" role="presentation">
                                <a id="profile-tab" className="nav-link active" data-toggle="tab" href="#tab-profile" aria-selected="true" role="tab">Profile Details</a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a id="chat-tab" className="nav-link" data-toggle="tab" href="#tab-chat" aria-selected="false" role="tab">Chat Info</a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a id="notification-tab" className="nav-link" data-toggle="tab" href="#tab-notification" aria-selected="false" role="tab">Notification</a>
                            </li>
                        </ul>
                        <form className='mt-4 shadow-md p-4 rounded bg-white' onSubmit={handleSubmit}>
                            <div className="tab-content">
                                <div id="tab-profile" className="tab-pane active show" role="tab-panel" aria-labelledby="profile-tab">
                                    <div className='row'>
                                        <div className='col-sm-4 col-xs-6'>
                                            <div className="mb-6">
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Advisor Name</label>
                                                <input type="text" id="customerName" value={name} onChange={(e) => setName(e.target.value)} placeholder='Advisor Name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                            </div>
                                        </div>
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
                                                <input type="date" id="birthDate" value={dob} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
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
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Position on Home page</label>
                                                <input type="number" value={position} onChange={(e) => setPosition(e.target.value)} placeholder='Position' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                            </div>
                                        </div>

                                        <div className='col-sm-4 col-xs-6'>
                                            <div className="mb-6">
                                                <label className="block mb-3 text-sm font-medium text-gray-900 dark:text-gray-300">Show On Home Page</label>
                                                <ul className="list-inline usertype">
                                                    <li className="list-inline-item">
                                                        <div className="radio">
                                                            <label>
                                                            <input type="radio" name='show-homepage' className="status-type" value="1" onChange={ShowhomeChange} id="show-homepage" />
                                                                <span className={activeRadioShowHome1}>YES</span>
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <div className="radio">
                                                            <label>
                                                            <input type="radio" name='show-homepage' className="status-type ml-2" value="0" onChange={ShowhomeChange} id="show-homepage2" />
                                                                <span className={activeRadioShowHome2}>NO</span>
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className='col-sm-4 col-xs-6'>
                                            <div className="mb-6">
                                                <label className="block mb-3 text-sm font-medium text-gray-900 dark:text-gray-300">Suspend Advisor</label>
                                                <ul className="list-inline usertype">
                                                    <li className="list-inline-item">
                                                        <div className="radio">
                                                            <label>
                                                            <input type="radio" name='suspend' className="status-type" onClick={SuspendedChange} value="1" id="availFreeMinutes" />
                                                                <span className={activeRadioSuspened1}>YES</span>
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <div className="radio">
                                                            <label>
                                                            <input type="radio" name='suspend' className="status-type ml-2" onClick={SuspendedChange} value="0" id="availFreeMinutes2" />
                                                                <span className={activeRadioSuspened2}>NO</span>
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className='col-sm-4 col-xs-6 hide-tab'>&nbsp;</div>
                                        <div className='col-sm-4 col-xs-6'>
                                            <div className="mb-6">
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Approved</label>
                                                <select id="approved" value={approved} onChange={handleApproved} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option value=''>Please select</option>
                                                    <option value="1">Approved</option>
                                                    <option value="0">Not Approved</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col-sm-4 col-xs-6'>
                                            <div className="mb-6">
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Select Category</label>
                                                <select id="approved" value={category} onChange={(e) => setCategory(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option value=''>Please select Category</option>
                                                    {categories && categories.map((category, index) => (
                                                    <option value={category._id} key={index}>{category.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col-sm-12'>
                                            <div className='flex'>
                                                <button type="submit" className="text-white bg-package-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Save</button>
                                                <Link to='/admin/advisors' className="text-white bg-dark font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center ml-2">Go Back</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="tab-chat" className="tab-pane" role="tab-panel" aria-labelledby="chat-tab">
                                    <div className='row'>
                                        <div className='col-sm-3 col-xs-6'>
                                            <div className="mb-6">
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Per minute rate</label>
                                                <input type="text" id="ratePerMinute" value={ratePerMin} onChange={(e) => setRatePerMin(e.target.value)} placeholder='Amount' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                            </div>
                                        </div>
                                        <div className='col-sm-3 col-xs-6'>
                                            <div className="mb-6">
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Min Chat Minutes</label>
                                                <input type="number" id="minChatMinutes" value={minChatMinutes} onChange={(e) => setMinChatMinutes(e.target.value)} placeholder='Min Chat Minutes' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                            </div>
                                        </div>
                                        <div className='col-sm-3 col-xs-6'>
                                            <div className="mb-6">
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" style={{letterSpacing: "-0.3px"}}>Commission Rate (in percentage %)</label>
                                                <input type="number" id="commissionRate" value={commissionRate} onChange={(e) => setCommissionRate(e.target.value)} placeholder='Commission Rate' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                            </div>
                                        </div>
                                        <div className='col-sm-3 col-xs-6'>
                                            <div className="mb-6">
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Available Free 30 minutes</label>
                                                {/* <input type="radio" name='30min' value="1" checked={availFreeMins === 1} onChange={(e) => setAvailFreeMins(e.target.value)} id="availFreeMinutes" /> Yes
                                                <input type="radio" name='30min' value="0" checked={availFreeMins === 0} onChange={(e) => setAvailFreeMins(e.target.value)} id="availFreeMinutes" className='ml-2' /> No */}

                                                <div className="flex">
                                                    <div className="flex items-center mr-3">
                                                    <input id="inline-radio" type="radio" checked={availFreeMins == '1'} onChange={(e) => setAvailFreeMins(e.target.value)} value="1" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="inline-radio" className="ml-2 mt-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                                                    </div>
                                                    <div className="flex items-center mr-3">
                                                    <input id="inline-2-radio" type="radio" checked={availFreeMins == '0'} onChange={(e) => setAvailFreeMins(e.target.value)} value="0" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="inline-2-radio" className="ml-2 mt-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <div className='col-sm-12'>
                                            <button type="submit" className="text-white bg-package-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Submit</button>
                                        </div>
                                    </div>
                                </div>
                                <div id="tab-notification" className="tab-pane" role="tab-panel" aria-labelledby="notification-tab">
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Send notification</label>
                                        <textarea id="Message" rows="3" onChange={(e) => setNotification(e.target.value)} defaultValue={notification} className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Your message'></textarea>
                                        <button type="submit" className="mt-3 text-white bg-package-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Send Notification</button>
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
