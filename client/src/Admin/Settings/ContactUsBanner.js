import React, { useState, useEffect } from 'react'
import FooterAdmin from '../../Components/Admin/Footer/FooterAdmin';
import Navbar from '../../Components/Admin/Navbar/AdminNavbar';
import Sidebar from '../../Components/Admin/Sidebar/Sidebar';
import axios from 'axios';
import swal from 'sweetalert';

export default function ContactUsBanner() { 
    
    const [image, setImage] = useState();
    const [file, setFile] = useState(null);
    const [contactTitle, setContactTitle] = useState('');
    const [supportEmail, setSupportEmail] = useState('');
    const [file1, setFile1] = useState(null);

    function handleChange(e) {
        setFile1(e.target.files[0]);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

        useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/upload-banners/contactus`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(result => {
            setImage(result.data.data.image);
            setContactTitle(result.data.data.contact_title);
            setSupportEmail(result.data.data.support_email);

        });
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (file1) {
          formData.append('image', file1);   
      }
      formData.append('contact_title', contactTitle);   
      formData.append('support_email', supportEmail);   

        axios.post(`${process.env.REACT_APP_BASE_URL}/admin/upload-banners/contactus`, formData, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken'),
            },
        }).then(res => {
            if (res.data.success === true) {
                swal("Success", "Data is updated successfully", "success");
                setTimeout(() => {
                    window.location = '/admin/contact-settings';
                }, 1000);

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
                        <h1 className='text-2xl text-black font-bold mb-3'>Contact Settings</h1>
                    </div>
                    <div className='form-group'>
                        <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Contact Title</label>
                        <input type="text" id="contactTitle" placeholder='Contact Title' onChange={(e) => setContactTitle(e.target.value)} value={contactTitle} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                    </div>
                    <div className='form-group'>
                        <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Support Email</label>
                        <input type="email" id="supportEmail" placeholder='Support email' onChange={(e) => setSupportEmail(e.target.value)} value={supportEmail} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                    </div>
                    <div className='form-group'>
                        <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300" htmlFor="file_input">Upload Banner (1140 px X 300 px)</label>
                        <input type="file" onChange={handleChange} style={{display: "block"}} />
                        <img src={file} className="img-fluid" id="file_input" onChange={(e) => setFile(e.target.files)} style={{maxWidth: "200px"}} />
                    </div>
                    <div className='form-group'>
                        <img src={`${process.env.REACT_APP_BASE_URL}/${image}`} alt="Contact us Banner" width="200px" />
                    </div>
                    <div className='form-group mt-2'>
                        <button type="submit" onClick={handleSubmit} className="text-white bg-hotel-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Save</button>
                    </div>
                </div>
            </div>
            <FooterAdmin />
        </div >
    )
}