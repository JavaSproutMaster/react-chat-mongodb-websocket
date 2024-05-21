import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FooterAdmin from '../../Components/Admin/Footer/FooterAdmin'
import AdminNavbar from '../../Components/Admin/Navbar/AdminNavbar'
import Sidebar from '../../Components/Admin/Sidebar/Sidebar'
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import axios from 'axios';
import swal from 'sweetalert';

export default function EditReview() {
    const params = useParams();
    const navigate = useNavigate();

    const [clientName, setClientName] = useState();
    const [advisorName, setAdvisorName] = useState();
    const [clientId, setClientId] = useState();
    const [advisorId, setAdvisorId] = useState();
    const [rating, setRating] = useState();
    const [status, setStatus] = useState();
    const [review, setReview] = useState();
    const [addedAt, setAddedAt] = useState();
    const [clients, setClients] = useState();
    const [advisors, setAdvisors] = useState();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/reviews/${params.id}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(result => {
            setClientName(result.data.data.client_name);
            setAdvisorName(result.data.data.advisor_name);
            setClientId(result.data.data.client._id);
            setAdvisorId(result.data.data.advisor._id);
            setRating(result.data.data.rating);
            setStatus(result.data.data.status);
            setReview(result.data.data.review);
            setAddedAt(result.data.data.addedAt);
        });

        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/clients?page=1&size=1000`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(result => {
            setClients(result.data.data);

        });

        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/advisors?page=1&size=1000`, {
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
            client_id: clientId,
            advisor_id: advisorId,
            status: status,
            review: review,
            rating: rating,
        }

        axios.put(`${process.env.REACT_APP_BASE_URL}/admin/reviews/${params.id}`, formData, {
            headers: {
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(res => {
            if (res.data.success === true) {
                swal("Data is updated successfully", "success");
                navigate(`/admin/reviews`);

            } else if (res.data.error) {
                swal(res.data.error.message, "error");

            }
        });

    }

    // Autocomplete function

    const handleOnAdvisorSelect = (item) => {
        console.log("handle select ", item);
        setAdvisorId(item._id)
    };

    const handleOnClientSelect = (item) => {
        console.log("handle select ", item);
        setClientId(item._id)
    };

    const handleOnClear = () => {
        console.log("Cleared");
    };
    // Autocomplete function end   

    return (
        <div className="relative md:ml-64 bg-default-skin">
            <Sidebar />
            <AdminNavbar />
            <div className="flex flex-wrap min600 add-review-page">
                <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 gridstyle">
                    <h1 className='text-2xl text-black font-bold mb-3'>Edit Review</h1>
                    <form className='mt-4 shadow-md p-4 rounded bg-white' onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Customer Name<small>(Autocomplete)</small></label>
                            {/* <input type="text" id="customerName" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder='Name of the Customer' className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /> */}
                            <ReactSearchAutocomplete
                                items={clients}
                                fuseOptions={{ keys: ["name"] }} // Search on both fields
                                resultStringKeyName="name" // String to display in the results
                                onSelect={handleOnClientSelect}
                                onClear={handleOnClear}
                                showIcon={false}
                                default={clientName}
                                value={clientName}
                                defaultValue={clientName}
                                placeholder='Customer Name'
                                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                styling={{
                                    height: "34px",
                                    borderRadius: "7px",
                                    backgroundColor: "white",
                                    boxShadow: "none",
                                    clearIconMargin: "3px 8px 0 0",
                                    zIndex: 2,
                                }}
                            />
                            <span>Current Client: {clientName}</span>
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Advisor Name<small>(Autocomplete)</small></label>
                            {/* <input type="text" id="advisorName" value={advisorName} onChange={(e) => setAdvisorName(e.target.value)} placeholder='Name of the Advisor' className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /> */}

                            <ReactSearchAutocomplete
                                items={advisors}
                                fuseOptions={{ keys: ["name"] }} // Search on both fields
                                resultStringKeyName="name" // String to display in the results
                                onSelect={handleOnAdvisorSelect}
                                onClear={handleOnClear}
                                showIcon={false}
                                placeholder='Advisor name'
                                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                styling={{
                                    height: "34px",
                                    borderRadius: "7px",
                                    backgroundColor: "white",
                                    boxShadow: "none",
                                    clearIconMargin: "3px 8px 0 0",
                                    zIndex: 2,
                                }}
                            />
                            <span>Current Advisor: {advisorName}</span>
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Review</label>
                            <textarea id="reviewMsg" defaultValue={review} onChange={(e) => setReview(e.target.value)} rows="3" className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Write review'></textarea>
                        </div>
                            <div className="form-check form-check-inline mt-3 mb-6 ratingreview">
                                <div className="flex items-center">
                                        <input className="w-4 h-4" type="radio" value="5" onChange={(e) => setRating(e.target.value)} name="flexRadioDefault" id="flexRadioDefault2" />
                                        <div className="flex items-center ml-2">
                                            <i className="bi bi-emoji-smile-fill"></i>
                                        </div>
                                        </div>
                                        <div className="flex items-center mr-2">
                                            <input className="w-4 h-4" type="radio" value="1" onChange={(e) => setRating(e.target.value)} name="flexRadioDefault" id="flexRadioDefault1" />
                                            <div className="flex items-center ml-2">
                                            <i className="bi bi-emoji-frown"></i>
                                        </div>
                                </div> 
                            </div>

                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Status</label>
                                    <select id="availability" value={status} onChange={(e) => setStatus(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value=''>Please select</option>
                                        <option value="1">Enable</option>
                                        <option value="0">Disable</option>
                                    </select>
                                </div>

                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Date added</label>
                            <input type="date" id="date" value={addedAt} onChange={(e) => setAddedAt(e.target.value)} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className='flex'>
                            <button type="submit" className="text-white bg-package-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Submit</button>
                            <Link to='/admin/reviews' className="text-white bg-dark font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center ml-2">Go Back</Link>
                        </div>
                    </form>
                </div>
            </div>
            <FooterAdmin />
        </div>
    )
}
