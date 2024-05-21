import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FooterAdmin from '../../Components/Admin/Footer/FooterAdmin'
import AdminNavbar from '../../Components/Admin/Navbar/AdminNavbar'
import Sidebar from '../../Components/Admin/Sidebar/Sidebar'
import axios from 'axios';
import swal from 'sweetalert';

export default function ViewCategory() {

    const params = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/categories/${params.id}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(result => {
            setName(result.data.data.name);
        });
    }, [params.id]);



    const handleSubmit = (e) => {

        e.preventDefault();

        const formData = {
            name: name
        }

        axios.put(`${process.env.REACT_APP_BASE_URL}/admin/categories/${params.id}`, formData, {
            headers: {
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(res => {
            if (res.data.success === true) {
                swal("Data is updated successfully", "success");
                navigate(`/admin/categories`);

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
                    <h1 className='text-2xl text-black font-bold mb-3'>Edit Category</h1>
                    <form className='mt-4 shadow-md p-4 rounded bg-white' onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className='col-sm-12'>
                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
                                    <input type="text" id="customerName" value={name} onChange={(e) => setName(e.target.value)} placeholder='Category Name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                            </div>                          
                            
                        </div>
                        <div className='flex'>
                            <button type="submit" className="text-white bg-package-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Submit</button>
                            <Link to='/admin/categories' className="text-white bg-dark font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center ml-2">Go Back</Link>
                        </div>
                    </form>
                </div>
            </div>
            <FooterAdmin />
        </div>
    )
}
