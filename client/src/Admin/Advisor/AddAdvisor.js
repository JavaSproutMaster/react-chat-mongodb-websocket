import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FooterAdmin from '../../Components/Admin/Footer/FooterAdmin'
import AdminNavbar from '../../Components/Admin/Navbar/AdminNavbar'
import Sidebar from '../../Components/Admin/Sidebar/Sidebar'
import axios from 'axios';
import swal from 'sweetalert';

export default function AddAdvisor() {

    const navigate = useNavigate();

    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [status, setStatus] = useState();
    const [ratePerMin, setRatePerMin] = useState();
    //const [notification, setNotification] = useState();
    const [availFreeMins, setAvailFreeMins] = useState();
    const [dob, setDob] = useState();




    const handleSubmit = async (e) => {

        e.preventDefault();

        const formData = {
            name: name,
            username: username,
            email: email,
            status: status,
            rate_per_min: ratePerMin,
            notification: '',
            avail_free_mins: availFreeMins,
            dob: dob,
        }

        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/advisors`, formData, {
                headers: {
                    'Authorization': `Bearer ` + localStorage.getItem('accessToken')
                },
            }).catch(error => {});

            if (res.data.success === true) {
                swal("Data is updated successfully", "success");
                navigate(`/admin/advisors`);
            }
        } catch (err) {

            let err_msg = '';

            if (err.response.data.data.errors.name[0]) {
                err_msg += err.response.data.data.errors.name[0];

            }

            if (err.response.data.data.errors.dob[0]) {
                err_msg += "  " + err.response.data.data.errors.dob[0];
            }

            if (err.response.data.data.errors.email[0]) {
                err_msg += " " + err.response.data.data.errors.email[0];
            }


            if (err.response.data.data.errors.username[0]) {
                err_msg += " " + err.response.data.data.errors.username[0];
            }

            if (err.response.data.data.errors.rate_per_min[0]) {
                err_msg += " " + err.response.data.data.errors.rate_per_min[0];
            }

            swal({
                title: 'Error!',
                text: err_msg,
                icon: "error",

            });



        }


    }


    return (
        <div className="relative md:ml-64 bg-default-skin">
            <Sidebar />
            <AdminNavbar />
            <div className="flex flex-wrap min600">
                    <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 gridstyle">
                        <h1 className='text-2xl text-black font-bold mb-3'>Add Advisor</h1>
                        <form className='mt-4 shadow-md p-4 rounded bg-white' onSubmit={handleSubmit}>
                            <div className='row'>
                                <div className='col-sm-4 col-sm-6'>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Advisor Name</label>
                                        <input type="text" id="customerName" value={name} onChange={(e) => setName(e.target.value)} placeholder='Advisor Name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                </div>
                                <div className='col-sm-4 col-sm-6'>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Username</label>
                                        <input type="text" id="userName" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                </div>
                                <div className='col-sm-4 col-sm-6'>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                                        <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                </div>
                                <div className='col-sm-4 col-sm-6'>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Date of Birth</label>
                                        <input type="date" id="birthDate" value={dob} onChange={(e) => setDob(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                </div>
                                <div className='col-sm-4 col-sm-6'>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Per minute rate</label>
                                        <input type="number" id="ratePerMinute" value={ratePerMin} onChange={(e) => setRatePerMin(e.target.value)} placeholder='Amount' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                </div>
                                <div className='col-sm-4 col-sm-6'>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Status</label>
                                        <select id="availability" value={status} onChange={(e) => setStatus(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option value=''>Please select</option>
                                            <option value="1">Enable</option>
                                            <option value="0">Disable</option>
                                        </select>
                                    </div>
                                </div>

                                <div className='col-sm-4 col-sm-6'>
                                        <div className="mb-6">
                                            <label className="block mb-3 text-sm font-medium text-gray-900 dark:text-gray-300">Suspend advisor</label>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="abc" defaultValue="1" checked={(availFreeMins === 1) ? 'checked' : true} onChange={(e) => setAvailFreeMins(e.target.value)} id="availFreeMinutes"/>
                                                <label className="form-check-label" htmlFor="inlineRadio1">YES</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="abc" defaultValue="0" checked={(availFreeMins === 0) ? 'checked' : true} onChange={(e) => setAvailFreeMins(e.target.value)} id="availFreeMinutes2"/>
                                                <label className="form-check-label" htmlFor="inlineRadio2">NO</label>
                                            </div>
                                            {/* <ul className="list-inline usertype">
                                                <li className="list-inline-item">
                                                    <div className="radio">
                                                        <label>
                                                        <input type="radio" name='abc' className="status-type" defaultValue="1" checked={(availFreeMins === 1) ? 'checked' : true} onChange={(e) => setAvailFreeMins(e.target.value)} id="availFreeMinutes" />
                                                            <span className="forcustom">YES</span>
                                                        </label>
                                                    </div>
                                                </li>
                                                <li className="list-inline-item">
                                                    <div className="radio">
                                                        <label>
                                                        <input type="radio" name='abc' className="status-type" defaultValue="0" checked={(availFreeMins === 0) ? 'checked' : true} onChange={(e) => setAvailFreeMins(e.target.value)} id="availFreeMinutes2" />
                                                            <span className="forcustom">NO</span>
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul> */}
                                    </div>
                                 </div>
                            </div>

                            <div className='flex'>
                                <button type="submit" className="text-white bg-package-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Submit</button>
                                <Link to='/admin/advisors' className="text-white bg-dark font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center ml-2">Go Back</Link>
                            </div>
                        </form>
                    </div>
            </div>
            <FooterAdmin />
        </div>
    )
}
