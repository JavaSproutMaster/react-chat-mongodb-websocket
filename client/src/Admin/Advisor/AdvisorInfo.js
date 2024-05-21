import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import AdminNavbar from '../../Components/Admin/Navbar/AdminNavbar'
import Sidebar from '../../Components/Admin/Sidebar/Sidebar'
import advisorProfile from '../../Assets/image/user-profile.png'
import FooterAdmin from '../../Components/Admin/Footer/FooterAdmin'
import axios from 'axios';


export default function AdvisorInfo() {

  const params = useParams();
  const [advisor, setAdvisor] = useState();
  const [myShare, setMyShare] = useState(0);
  const [image, setImage] = useState('');
  const [govtidFront, setGovtDocFront] = useState('');
  const [govtidBack, setGovtDocBack] = useState('');
  const [certi, setCerti] = useState('');
  const [us_tax_norms,setUsTaxNorms] = useState('');
  const [src, setSrc] = useState('');
  const [GovtIdFrontsrc, setGovtIdSrcFront] = useState('');
  const [GovtIdBacksrc, setGovtIdSrcBack] = useState('');
  const [Certisrc, setCertiSrc] = useState('');
  const SURL = process.env.REACT_APP_BASE_URL;
  const [categories,setCategories] = useState([]);
  const [category,setCategory] = useState('');
  const [stripeConnected, setStripeConnected] = useState('');
  const [comm, setComm] = useState(0);
  const [GlobalComm , setGlobalComm] = useState(0);
  const [finalShare,setFinalShare] = useState(0);
  const [ratePerMin, setRatePerMin] = useState('');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/admin/advisors/${params.id}`, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + localStorage.getItem('accessToken')
      },
    }).then(result => {
      setAdvisor(result.data.data);
      setMyShare(result.data.my_share);
      setSrc(result.data.data.avatar);
      setUsTaxNorms(result.data.data.us_tax_norms);
      setGovtIdSrcFront(result.data.data.gov_photo_id_front);
      setGovtIdSrcBack(result.data.data.gov_photo_id_backend);
      setCertiSrc(result.data.data.certificate);
      setCategory(result.data.data.category);
      setStripeConnected(result.data.data.connect_on_boarding);
      setRatePerMin(result.data.data.rate_per_min);
      setComm(result.data.data.commission_rate);
      setGlobalComm(result.data.globalCommRate);
    });

    axios.get(`${process.env.REACT_APP_BASE_URL}/admin/categories`, {
      headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ` + localStorage.getItem('accessToken')
      },
    }).then(result => {
        if(result.data.data.length > 0) {
          setCategories(result.data.data);
        } else {
          setCategories([]);
        }
    });

  }, [params.id]);

  useEffect(() => {
    if(comm === 0 && GlobalComm != 0) {
      var Share  = ratePerMin - parseFloat(ratePerMin * GlobalComm) / 100;
      setFinalShare(Share);
    } else if(comm === 0 && GlobalComm === 0) {
      var  Share  = ratePerMin;
      setFinalShare(Share);
    } else {
      var Share  = parseFloat(ratePerMin * comm) / 100;
      setFinalShare(Share);
    }
    
  }, [comm, ratePerMin]);

  const DefaultPlaceholder = (e) => {
    e.target.src= '/assets/images/frontend/user-placeholder.png';
  }

  const DefaultPdfPlaceholder = (e) => {
    e.target.src= '/assets/images/avtar/pdf.png';
  }

  const HandleShare = (e) => {
    setRatePerMin(e.target.value);
    if(comm === 0 && GlobalComm != 0) {
      var Share  = e.target.value - parseFloat(e.target.value * GlobalComm) / 100;
      setFinalShare(Share);
    } else if(comm === 0 && GlobalComm === 0) {
      var  Share  = e.target.value;
      setFinalShare(Share);
    } else {
      var Share  = parseFloat(e.target.value * comm) / 100;
      setFinalShare(Share);
    }
  }

  return (
    <div className="relative md:ml-64 bg-default-skin advisor-info-page">
      <Sidebar />
      <AdminNavbar />
      <div className="flex flex-wrap min600">
          <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 gridstyle">
            <h1 className='text-2xl text-black font-bold mb-3'>Advisor Information</h1>
            <div className='advisor-informa'>
              <ul className="nav nav-tabs" AriaRole="tablist">

                <li className="nav-item mr-2" AriaRole="presentation">
                  <a id="profile-tab" className="nav-link active" data-toggle="tab" href="#tab-profile" aria-expanded="true" AriaRole="profile-tab">My Profile</a>
                </li>
                <li className="nav-item" AriaRole="presentation">
                  <a id="service-tab" className="nav-link" data-toggle="tab" href="#tab-service" aria-expanded="false" AriaRole="service-tab">My Services</a>
                </li>
                <li className="nav-item" AriaRole="presentation">
                  <a id="documents-tab" className="nav-link" data-toggle="tab" href="#tab-documents" aria-expanded="false" AriaRole="documents-tab">My Documents</a>
                </li>
                <li className="nav-item mr-2" AriaRole="presentation">
                  <a id="payment-tab" className="nav-link" data-toggle="tab" href="#tab-payment" aria-expanded="false" AriaRole="payment-tab">Payment Details</a>
                </li>
              </ul>
              <div className="tab-content">
                <div id="tab-profile" className="tab-pane active show" AriaRole="tab-profile" aria-labelledby="profile-tab">
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
                      {/* <div className='col-sm-12'>
                        <div className='form-group'>
                          <label className="control-label font-bold">Address</label>
                          <textarea value={advisor?.address} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' rows='2' placeholder='Address' disabled></textarea>
                        </div>
                      </div> */}
                      {/* <div className='col-sm-12'>
                        <div className='form-group'>
                          <label className="control-label font-bold">Brief Marketing Intro</label>
                          <textarea value={advisor?.marketing_intro} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' rows='2' placeholder='This will be the first place your clients get to know you when they browse the advisor list' disabled></textarea>
                        </div>
                      </div> */}
                      <div className='col-sm-12'>
                        <div className='form-group'>
                          <label className="control-label font-bold">About Me</label>
                          <textarea value={advisor?.description} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' rows='2' placeholder='This will be the first place your clients get to know you when they browse the advisor list' disabled></textarea>
                        </div>
                      </div>
                      <div className='col-sm-4 col-xs-6'>
                        <div className='form-group'>
                          <label className="control-label font-bold">Rate per minute</label>
                          <input type='number'  onChange={HandleShare} value={advisor?.rate_per_min} name='rate' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' disabled />
                        </div>
                      </div>
                      <div className='col-sm-4 col-xs-6'>
                        <div className='form-group'>
                          <label className="control-label font-bold">Share per minute</label>
                          <input type='number' value={finalShare} name='share' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' disabled />
                        </div>
                      </div>

                      {/* <div className='col-sm-4 col-xs-6'>
                        <div className="mb-6">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Status</label>
                          <select id="availability" value={advisor?.status} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value=''>Please select</option>
                            <option value="1">Enable</option>
                            <option value="0">Disable</option>
                          </select>
                        </div>
                      </div> */}

                      <div className='col-sm-4 col-xs-6'>
                        <div className="mb-6">
                          <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Category</label>
                          <select id="availability" value={advisor?.category} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value=''>Please select</option>
                            {
                              categories && categories.map((itm,index) => (
                                <option value={itm._id} key={index}>{itm.name}</option>
                              ))
                            }
                          </select>
                        </div>
                      </div>

                      {/* <div className='col-sm-4 col-xs-6'>
                        <div className="mb-6">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Approved</label>
                          <select id="approved" value={advisor?.approved} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value=''>Please select</option>
                            <option value="1">Approved</option>
                            <option value="0">Not Approved</option>
                          </select>
                        </div>
                      </div> */}
                      <div className='col-sm-4 col-xs-6'>
                        <div className="mb-6">
                          <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Available Free 30 minutes</label>
                          <select id="availFreeMinutes" value={advisor?.avail_free_mins} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value=''>Please select</option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                          </select>
                        </div>
                      </div>
                     
                    </div>
                  </form>
                </div>
                <div id="tab-service" className="tab-pane" AriaRole="tab-service" aria-labelledby="service-tab">
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
                <div id="tab-documents" className="tab-pane" AriaRole="tab-service" aria-labelledby="document-tab">
                    <>
                      <div className="row mb-3 mt-3">
                      <div className='col-sm-12'>
                             <span className=' font-semibold block text-pink text-lg mb-2'>Profile Picture</span>
                      </div>
                      <div className='col-sm-12'>

                          <div className='form-group'>
                            {/* <label className="control-label font-bold">Profile Photo</label> */}

                            {advisor?.avatar
                              ? <img src={`${process.env.REACT_APP_BASE_URL}/${advisor?.avatar}`} className='img-fluid' alt='Profile' style={{ maxWidth: "150px" }} />
                              : ' No profile photo available'
                            }
                            {
                              advisor?.avatar && 
                              <>
                                  <a href={(`${process.env.REACT_APP_BASE_URL}/${advisor?.avatar}`)} target="_blank" className='downloadbtnicon' download><i className="fa fa-cloud-arrow-down"></i></a>
                              </>
                            }
                          </div>
                          <div className="mb-4 mt-2 block w-full border-b border-gray-300"></div>
                          </div>
                          
                            <div className='col-sm-12'>
                             <span className=' font-semibold block text-pink text-lg mb-2'>Government Photo ID</span></div>
                          
                              <div className="col-sm-4 col-md-6 col-12 mb-3">
                                <div className='row'>
                                  <div className='col-sm-12'><label htmlFor="inputlabel" className="col-form-label text-base text-right text-black font-semibold">Front</label><span className=' italic text-black label-text font-medium block mb-2'>(JPG , PNG Format)</span></div>
                                  
                                    
                                    <div className='col-sm-12 mt-2'>
                                    <div className='GovtID'>
                                    <img src={(`${SURL}/${GovtIdFrontsrc}`)} onError = {DefaultPlaceholder} alt="governtment id front side" className="img-responsive" />
                                    {
                                      GovtIdFrontsrc && 
                                      <>
                                          <a href={(`${process.env.REACT_APP_BASE_URL}/${GovtIdFrontsrc}`)} target="_blank" className='downloadbtnicon' download><i className="fa fa-cloud-arrow-down"></i></a>
                                      </>
                                    }
                                    </div>
                                    </div>
                                </div>
                            </div>

                            
                            <div className="col-sm-4 col-md-6 col-12">
                                <div className='row'>
                                  <div className='col-sm-12'><label htmlFor="inputlabel" className="col-form-label text-base text-right text-black font-semibold">Back</label><span className=' label-text italic text-black font-medium block mb-2'>(JPG , PNG Format)</span></div>
                                    
                                    <div className='col-sm-12 mt-2'>
                                      <div className='GovtID'>
                                      <img src={(`${SURL}/${GovtIdBacksrc}`)}  onError = {DefaultPlaceholder} alt="governtment id back side"  className="img-responsive" />
                                      {
                                        GovtIdBacksrc && 
                                        <>
                                            <a href={(`${process.env.REACT_APP_BASE_URL}/${GovtIdBacksrc}`)} target="_blank" className='downloadbtnicon' download><i className="fa fa-cloud-arrow-down"></i></a>
                                        </>
                                      }
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>   

                        <div className='mb-4 mt-2 block border-b border-gray-300'></div>
                          <div className='row mb-3'>
                           <div className='col-sm-12'><span className=' font-semibold block text-pink text-lg mb-2'>Certificate Proof</span></div>
                            <div className="col-sm-12 col-12">
                                <div className='row'>
                                  <div className='col-sm-12'><label htmlFor="inputlabel" className="col-form-label text-base text-right text-black font-semibold">Certificate Proof (If needed)</label><span className='  italic text-black label-text font-medium block mb-2'>(JPG , PNG , Pdf Format)</span></div>
                                      <div className='col-sm-12'>
                                      <div className='row'>
                                        {
                                            Certisrc && Certisrc.map((itm,indx) => (
                                             
                                                 <div className='col-sm-3 col-6 mt-2' key={indx}>
                                                  <div className='CertificateP'>
                                                    <div className='mb-3'>
                                                        { itm.certificate.indexOf('.pdf') !== -1 ?  
                                                          <>
                                                          <div className='CertificatePremove'>
                                                              <a href={(`${SURL}/${itm.certificate}`)} target="_blank" title='Download' className='downloadbtnicon' download><i className="fa fa-cloud-arrow-down"></i></a>
                                                          </div>
                                                            <img src={(`${SURL}/${DefaultPdfPlaceholder}`)} onError = {DefaultPdfPlaceholder}  alt="Certificate proof"  className="img-responsive" />
                                                            
                                                          </>
                                                            :
                                                            <>
                                                                <img src={(`${SURL}/${itm.certificate}`)} onError = {DefaultPlaceholder}  alt="Certificate proof"  className="img-responsive" />
                                                               
                                                                    <a href={(`${process.env.REACT_APP_BASE_URL}/${itm.certificate}`)} target="_blank" className='downloadbtnicon' download><i className="fa fa-cloud-arrow-down"></i></a>
                                                            </>
                                                        }
                                                    </div>
                                                  </div>
                                                 </div>
                                               
                                            ))
                                        } 
                                      </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-12">
                              <label htmlFor="inputname" className="col-form-label text-base text-right text-black font-semibold">US Tax Form: </label>
                                  {us_tax_norms && <>
                                    <a style={{marginLeft: "10px"}} href={(`${process.env.REACT_APP_BASE_URL}/${us_tax_norms}`)} target="_blank" className='downloadbtnicon' download><i className="fa fa-cloud-arrow-down"></i></a>
                                      <img src="/assets/images/avtar/pdf.png" className="img-fluid"  />
                                  </>}
                              </div>
                        </div>   
                    </>
                </div>
                <div id="tab-payment" className="tab-pane" AriaRole="tab-payment" aria-labelledby="payment-tab">
                  <form className='mt-4 shadow-md p-4 rounded bg-white'>
                    <div className='payStatus'>
                      <div className='form-group'>
                        <label className="control-label font-bold d-block">Connected with Stripe</label>
                        <button className='btn btn-info' disabled>
                          { stripeConnected ? 'Yes': 'No'}
                        </button>
                      </div>
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
