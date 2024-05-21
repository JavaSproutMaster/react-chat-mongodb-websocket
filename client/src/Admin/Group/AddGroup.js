import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FooterAdmin from '../../Components/Admin/Footer/FooterAdmin'
import AdminNavbar from '../../Components/Admin/Navbar/AdminNavbar'
import Sidebar from '../../Components/Admin/Sidebar/Sidebar'
import axios from 'axios';
import swal from 'sweetalert';

export default function AddGroup() {

    const navigate = useNavigate();

    const [name, setName] = useState();
    const [status, setStatus] = useState();
    const [permissions, setPermissions] = useState([]);


    const handleChange = (e) => {
        if (e.target.checked) {
            setPermissions([...permissions, e.target.value])
        }else{
            setPermissions(permissions.filter((item, index) => item !== e.target.value));
        }
    }


    const handleSubmit = async (e) => {

        e.preventDefault();

        const formData = {
            name: name,
            permissions: permissions,
            status: status,
        }

        try {

            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/groups`, formData, {
                headers: {
                    'Authorization': `Bearer ` + localStorage.getItem('accessToken')
                },
            });


            if (res.data.success === true) {
                swal("Data is updated successfully", "success");
                navigate(`/admin/groups`);

            }

        } catch (err) {

            let err_msg = '';

            if (err.response.data.data.errors.name[0]) {
                err_msg += err.response.data.data.errors.name[0];

            }

            swal({
                title: 'Error!',
                text: err_msg,
                icon: "error",

            });



        }


    }

console.log('permissions',permissions);
    return (
        <div className="relative md:ml-64 bg-default-skin">
            <Sidebar />
            <AdminNavbar />
            <div className="flex flex-wrap min600">
                <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 gridstyle">
                    <h1 className='text-2xl text-black font-bold mb-3'>Add Group</h1>
                    <form className='mt-4 shadow-md p-4 rounded bg-white' onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className='col-sm-12'>
                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
                                    <input type="text" id="customerName" value={name} onChange={(e) => setName(e.target.value)} placeholder='Group Name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                            </div>
                            <div className='col-sm-12'>
                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Permissions</label>
                                    <div className="form-check">
                                        <input type="checkbox" onChange={(e) => handleChange(e)} className="form-check-input" id="check1" name="permissions" value="Dashboard" />
                                        <label className="form-check-label" htmlFor="check1">Dashboard</label>
                                    </div>
                                    <div className="form-check">
                                        <input type="checkbox" onChange={(e) => handleChange(e)} className="form-check-input" id="check2" name="permissions" value="Customers" />
                                        <label className="form-check-label" htmlFor="check2">Customers</label>
                                    </div>
                                    <div className="form-check">
                                        <input type="checkbox" onChange={(e) => handleChange(e)} className="form-check-input" id="check1" name="permissions" value="Advisors" />
                                        <label className="form-check-label" htmlFor="check1">Advisors</label>
                                    </div>
                                    <div className="form-check">
                                        <input type="checkbox" onChange={(e) => handleChange(e)} className="form-check-input" id="check2" name="permissions" value="Reviews" />
                                        <label className="form-check-label" htmlFor="check2">Reviews</label>
                                    </div>
                                    <div className="form-check">
                                        <input type="checkbox" onChange={(e) => handleChange(e)} className="form-check-input" name="permissions" checked={permissions.includes('Tickets')} value="Tickets" />
                                        <label className="form-check-label" htmlFor="check2">Tickets</label>
                                    </div>
                                    <div className="form-check">
                                        <input type="checkbox" onChange={(e) => handleChange(e)} className="form-check-input" id="check1" name="permissions" value="Payouts" />
                                        <label className="form-check-label" htmlFor="check1">Payouts</label>
                                    </div>
                                    <div className="form-check">
                                        <input type="checkbox" onChange={(e) => handleChange(e)} className="form-check-input" id="check2" name="permissions" value="Transactions" />
                                        <label className="form-check-label" htmlFor="check2">Transactions</label>
                                    </div>
                                    <div className="form-check">
                                        <input type="checkbox" onChange={(e) => handleChange(e)} className="form-check-input" id="check1" name="permissions" value="Agreement" />
                                        <label className="form-check-label" htmlFor="check1">Agreement</label>
                                    </div>
                                    <div className="form-check">
                                        <input type="checkbox" onChange={(e) => handleChange(e)} className="form-check-input" id="check1" name="permissions" value="Users" />
                                        <label className="form-check-label" htmlFor="check1">Users</label>
                                    </div>
                                    <div className="form-check">
                                        <input type="checkbox" onChange={(e) => handleChange(e)} className="form-check-input" id="check2" name="permissions" value="Settings" />
                                        <label className="form-check-label" htmlFor="check2">Settings</label>
                                    </div>
                                </div>
                            </div>                                

                            <div className='col-sm-12'>
                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Status</label>
                                    <select id="availability" value={status} onChange={(e) => setStatus(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value=''>Please select</option>
                                        <option value="1">Enable</option>
                                        <option value="0">Disable</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className='flex'>
                            <button type="submit" className="text-white bg-package-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Submit</button>
                            <Link to='/admin/groups' className="text-white bg-dark font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center ml-2">Go Back</Link>
                        </div>
                    </form>
                </div>
            </div>
            <FooterAdmin />
        </div>
    )
}
