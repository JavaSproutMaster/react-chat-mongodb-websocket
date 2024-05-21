import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FooterAdmin from '../../Components/Admin/Footer/FooterAdmin';
import Navbar from '../../Components/Admin/Navbar/AdminNavbar';
import Sidebar from '../../Components/Admin/Sidebar/Sidebar';
import axios from 'axios';
import swal from 'sweetalert';

export default function MyAccount() {
    const [file, setFile] = useState();
    const [file1, setFile1] = useState();
    function handleChange(e) {
        setImage('');
        setFile1(e.target.files[0]);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    const navigate = useNavigate();
    const [image, setImage] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [details, setDetails] = useState([]);


    const handleSubmit = (e) => {

        e.preventDefault();

        const formData = new FormData();
        if (file1) {
            formData.append("avatar", file1);
        }
        formData.append("name", name);
        formData.append("email", email);

        axios.patch(`${process.env.REACT_APP_BASE_URL}/admin/auth/profile`, formData, {
            headers: {
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(res => {
            console.log('ddddddddddd',res.data.data);
            if (res.data.success === true) {
                swal("Success", "Data is updated successfully", "success");
                navigate(`/admin/my-account`);

            } else if (res.data.error) {
                swal(res.data.error.message, "error");

            }
        });

    }

    function getDetails() {

        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/auth/profile`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(result => {
            setName(result.data.data.name);
            setEmail(result.data.data.email);
            setImage(result.data.data.avatar);

        });
    }

    useEffect(() => {
        getDetails();
    }, []);




    return (
        <div className="relative md:ml-64 bg-default-skin">
            <Sidebar />
            <Navbar />
            <div className="flex flex-wrap min600">
                <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 gridstyle">
                    <div className='mt-4'>
                        <h1 className='text-2xl text-black font-bold mb-3'>My account</h1>
                    </div>
                    <form className='mt-4 shadow-md p-4 rounded bg-white' onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Full Name</label>
                            <input type="text" id="accountName" placeholder='Account name' onChange={(e) => setName(e.target.value)} value={name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>
                        <div className='form-group'>
                            <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Email</label>
                            <input type="text" id="accountEmail" placeholder='Account email' onChange={(e) => setEmail(e.target.value)} value={email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>
                        <div className='form-group'>
                            <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300" htmlFor="file_input">Upload Profile Image</label>
                            <input type="file" onChange={handleChange} style={{display: "block"}} />
                            <img src={file} className="img-fluid" style={{maxWidth: "200px"}} />
{image &&
                            <div className='form-group'>
                        <img src={`${process.env.REACT_APP_BASE_URL}/${image}`} alt="User Profile" width="200px" />
                    </div>
                }

                            {/* <input onChange={HandleImage} className="block text-sm text-gray-900 bg-white rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
                            {details && <img src={`${process.env.REACT_APP_BASE_URL}/${details}`} alt="User Profile" width="200px" />} */}
                        </div>
                        <div className='form-group mt-2'>
                            <button type="submit" className="text-white bg-hotel-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Save</button>
                        </div>
                    </form>
                </div>
            </div>
            <FooterAdmin />
        </div >
    )
}