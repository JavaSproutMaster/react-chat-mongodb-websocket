import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import AdminNavbar from '../../Components/Admin/Navbar/AdminNavbar'
import Sidebar from '../../Components/Admin/Sidebar/Sidebar'
import advisorProfile from '../../Assets/image/advisor-profile.jpeg'
import FooterAdmin from '../../Components/Admin/Footer/FooterAdmin'
import axios from 'axios';

export default function AdvisorInfo() {

  const params = useParams();

  const [advisor, setAdvisor] = useState();


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/admin/advisors/${params.id}`, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + localStorage.getItem('accessToken')
      },
    }).then(result => {
      setAdvisor(result.data.data);

    });
  }, [params.id]);

  return (
    <div className="relative md:ml-64 bg-default-skin">
      <Sidebar />
      <AdminNavbar />
      <div className="flex flex-wrap min600">
        <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 gridstyle">
          <h1 className='text-2xl text-black font-bold mb-3'>Advisor Information</h1>
          <div className='advisor-informa'>
            <ul className="nav nav-tabs" AriaRole="tablist">
              <li className="nav-item mr-2" AriaRole="presentation">
                <a id="profile-tab" className="nav-link active" data-toggle="tab" href="#tab-profile" aria-expanded="true" AriaRole="tab">Profile Information</a>
              </li>
              <li className="nav-item mr-2" AriaRole="presentation">
                <a id="payment-tab" className="nav-link" data-toggle="tab" href="#tab-payment" aria-expanded="false" AriaRole="tab">Payment Details</a>
              </li>
              <li className="nav-item" AriaRole="presentation">
                <a id="service-tab" className="nav-link" data-toggle="tab" href="#tab-service" aria-expanded="false" AriaRole="tab">My Services</a>
              </li>
            </ul>
            <div className="tab-content">
              <div id="tab-profile" className="tab-pane active show" AriaRole="tab-panel" aria-labelledby="profile-tab">
                <form className='mt-4 shadow-md p-4 rounded bg-white'>
                  <div className='row'>
                    <div className='col-sm-6'>
                      <div className='form-group'>
                        <label className="control-label font-bold">Registered Email</label>
                        <input type='email' name='email' value={advisor?.email} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' disabled />
                      </div>
                    </div>
                    <div className='col-sm-6'>
                      <div className='form-group'>
                        <label className="control-label font-bold">Mobile Number</label>
                        <input type='tel' name='phone' value={advisor?.mobile} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' disabled />
                      </div>
                    </div>
                    <div className='col-sm-6'>
                      <div className='form-group'>
                        <label className="control-label font-bold">Username</label>
                        <input type='text' name='username' value={advisor?.username} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' disabled />
                      </div>
                    </div>
                    <div className='col-sm-6'>
                      <div className='form-group'>
                        <label className="control-label font-bold">Screen name</label>
                        <input type='text' name='name' value={advisor?.displayname} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' disabled />
                      </div>
                    </div>
                    <div className='col-sm-12'>
                      <div className='form-group'>
                        <label className="control-label font-bold">Address</label>
                        <textarea value={advisor?.address} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' rows='2' placeholder='Address' disabled></textarea>
                      </div>
                    </div>
                    <div className='col-sm-12'>
                      <div className='form-group'>
                        <label className="control-label font-bold">Brief Marketing Intro</label>
                        <textarea value={advisor?.marketing_intro} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' rows='2' placeholder='This will be the first place your clients get to know you when they browse the advisor list' disabled></textarea>
                      </div>
                    </div>
                    <div className='col-sm-12'>
                      <div className='form-group'>
                        <label className="control-label font-bold">My Profile</label>
                        <textarea value={advisor?.description} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' rows='2' placeholder='This will be the first place your clients get to know you when they browse the advisor list' disabled></textarea>
                      </div>
                    </div>
                    <div className='col-sm-4'>
                      <div className='form-group'>
                        <label className="control-label font-bold">Year Of Expirence</label>
                        <input type='number' value={advisor?.year_of_exp} name='year' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' disabled />
                      </div>
                    </div>
                    <div className='col-sm-4'>
                      <div className='form-group'>
                        <label className="control-label font-bold">Rate per minute</label>
                        <input type='number' value={advisor?.rate_per_min} name='rate' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' disabled />
                      </div>
                    </div>
                    <div className='col-sm-4'>
                      <div className='form-group'>
                        <label className="control-label font-bold">Share per minute</label>
                        <input type='number' value={advisor?.my_mhare} name='share' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' disabled />
                      </div>
                    </div>

                    <div className='col-sm-4'>
                      <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Status</label>
                        <select id="availability" value={advisor?.status} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option value=''>Please select</option>
                          <option value="1">Enable</option>
                          <option value="0">Disable</option>
                        </select>
                      </div>
                    </div>
                    <div className='col-sm-4'>
                      <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Approved</label>
                        <select id="approved" value={advisor?.approved} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option value=''>Please select</option>
                          <option value="1">Approved</option>
                          <option value="0">Not Approved</option>
                        </select>
                      </div>
                    </div>
                    <div className='col-sm-4'>
                      <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Avail Free 30 minutes</label>
                        <input type="radio" name='30min' value="1" checked={advisor?.availFreeMins === 30} id="availFreeMinutes" /> Yes
                        <input type="radio" name='30min' value="0" checked={advisor?.availFreeMins === 0} id="availFreeMinutes" className='ml-2' /> No
                      </div>
                    </div>
                    <div className='col-sm-12'>
                      <div className='form-group'>
                        <label className="control-label font-bold">Profile Photo</label>

                        {advisor?.avatar
                          ? <img src={`${process.env.REACT_APP_BASE_URL}/${advisor?.avatar}`} className='img-fluid' alt='Profile' style={{ maxWidth: "150px" }} />
                          : <img src={advisorProfile} className='img-fluid' alt='Profile' style={{ maxWidth: "150px" }} />
                        }
                      </div>
                    </div>
                    
                  </div>
                </form>
              </div>
              <div id="tab-payment" className="tab-pane" AriaRole="tab-panel" aria-labelledby="payment-tab">
                <form className='mt-4 shadow-md p-4 rounded bg-white'>
                  <div className='payStatus'>
                    <div className='form-group'>
                      <label className="control-label font-bold d-block">Connected with Stripe</label>
                      <button className='btn btn-info' disabled>Yes</button>
                    </div>
                  </div>
                </form>
              </div>
              <div id="tab-service" className="tab-pane" AriaRole="tab-panel" aria-labelledby="service-tab">
                <form className='mt-4 shadow-md p-4 rounded bg-white'>
                  <div className='serv'>
                    <h3>{advisor?.service?.name1}</h3>
                    <p>{advisor?.service?.description1}</p>
                  </div>
                  <div className='serv'>
                    <h3>{advisor?.service?.name2}</h3>
                    <p>{advisor?.service?.description2}</p>
                  </div>
                  <div className='serv'>
                    <h3>{advisor?.service?.name3}</h3>
                    <p>{advisor?.service?.description3}</p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div >
      <FooterAdmin />
    </div >
  )
}
