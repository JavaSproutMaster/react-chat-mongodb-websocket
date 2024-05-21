import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import FooterAdmin from '../../Components/Admin/Footer/FooterAdmin';
import Navbar from '../../Components/Admin/Navbar/AdminNavbar';
import Sidebar from '../../Components/Admin/Sidebar/Sidebar';

import axios from 'axios';
import swal from 'sweetalert';


export default function ChangePassword() {
  const navigate = useNavigate();

  const [pwd, setPwd] = useState();
  const [pwd_conf, setPwdConf] = useState();
  const [pwd_curr_conf, setPwdCurrConf] = useState();


  const handleSubmit = (e) => {

    e.preventDefault();

    const formData = {
      "password": pwd,
      "password_confirmation": pwd_conf,
      "current_password": pwd_curr_conf
    }

    axios.post(`${process.env.REACT_APP_BASE_URL}/admin/auth/update-password`, formData, {
      headers: {
        'Authorization': `Bearer ` + localStorage.getItem('accessToken')
      },
    }).then(res => {
      if (res.data.success === true) {
        swal("Data is updated successfully", "success");
        setPwd('');
        setPwdConf('');
        setPwdCurrConf('');
        navigate(`/admin/change-password`);

      } else if (res.data.error) {
        swal(res.data.error.message, "error");

      }
    });

  }



  return (
    <div className="relative md:ml-64 bg-default-skin">
      <Sidebar />
      <Navbar />
      <div className="flex flex-wrap min600">
        <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 gridstyle">
          <div className='mt-4'>
            <h1 className='text-2xl text-black font-bold mb-3'>Change Password</h1>
          </div>
          <form className='mt-4 shadow-md p-4 rounded bg-white' onSubmit={handleSubmit}>
            <div className='form-group'>
              <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Current password*</label>
              <input type="text" id="currentPass" onChange={(e) => setPwdCurrConf(e.target.value)} placeholder='Enter current password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
            </div>
            <div className='form-group'>
              <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">New password*</label>
              <input type="text" id="newPass" onChange={(e) => setPwd(e.target.value)} placeholder='Enter new password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
            </div>
            <div className='form-group'>
              <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">New password confirmation*</label>
              <input type="text" id="confirmNewPass" onChange={(e) => setPwdConf(e.target.value)} placeholder='Confirm new password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
            </div>
            <div className='form-group mt-2'>
              <button type="submit" className="text-white bg-hotel-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Save</button>
            </div>
          </form>
        </div>
      </div>
      <FooterAdmin />
    </div>
  )
}