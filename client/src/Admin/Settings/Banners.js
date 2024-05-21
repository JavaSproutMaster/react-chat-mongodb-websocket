import React, { useState, useEffect } from 'react'
import FooterAdmin from '../../Components/Admin/Footer/FooterAdmin';
import Navbar from '../../Components/Admin/Navbar/AdminNavbar';
import Sidebar from '../../Components/Admin/Sidebar/Sidebar';
import axios from 'axios';
import swal from 'sweetalert';

export default function Banners() { 

    const [images, setImages] = useState([]);
    const [file, setFile] = useState(null);
    const [file1, setFile1] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleImageChange = (e) => {
      if (e.target.files) {

         setFile1(e.target.files);


        const filesArray = Array.from(e.target.files).map((file) =>
          URL.createObjectURL(file)
        );
        setSelectedFiles((prevImages) => prevImages.concat(filesArray));
       
      }
    };
    const renderPhotos = (source) => {
        return source.map((photo) => {
            return <img src={photo} alt="" key={photo + new Date().toLocaleString()} />;
        });
    };

        useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/upload-banners`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(result => {
            setImages(result.data.data);

        });
    }, []);

        const HandleDelete = (id) => {

            axios.delete(`${process.env.REACT_APP_BASE_URL}/admin/upload-banners/${id}`, {
                headers: {
                'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ` + localStorage.getItem('accessToken')
                },
            }).then(result => {
                swal("Success", "Data is deleted", "success");
                setTimeout(() => {
                    window.location = '/admin/banners';
                }, 1000);
            });
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (file1 && file1.length) {
            for (let i = 0; i < file1.length; i++) {
              formData.append('images', file1[i]);
          }    
      }else{
        console.log('ddddd',file1);
        formData.append('images', file1[0]);
    }

        axios.post(`${process.env.REACT_APP_BASE_URL}/admin/upload-banners`, formData, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken'),
            },
        }).then(res => {
            if (res.data.success === true) {
                swal("Success", "Data is updated successfully", "success");
                setTimeout(() => {
                    window.location = '/admin/banners';
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
                        <h1 className='text-2xl text-black font-bold mb-3'>Upload home page banner</h1>
                    </div>
                    <div className='form-group'>
                    <input type="file" id="file" multiple onChange={handleImageChange} />
                    <div className="label-holder">
                        <label htmlFor="file" className="label">
                            <i className="material-icons">Upload Images (1200 px X 352 px)</i>
                        </label>
                    </div>
                    <div className="imageResult result">{renderPhotos(selectedFiles)}</div>
                        {/* <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300" htmlFor="file_input">Upload Banner Images</label>
                        <input onChange={(e) => setFile(e.target.files)} className="block text-sm text-gray-900 bg-white rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" multiple type="file" /> */}
                    </div>
                    <div className='form-group mt-2'>
                        <button type="submit" onClick={handleSubmit} className="text-white bg-hotel-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Save</button>
                    </div>

                    <p>
                        {images && images.map((image, index) => (
                            <span key={index}>
                                <img src={`${process.env.REACT_APP_BASE_URL}/${image.image}`} alt="Home page banner" width="200px" />
                                <button className="mt-2 mb-2 btn btn-danger" onClick={() => HandleDelete(image._id)}>Delete</button>
                            </span>
                        ))}
                    </p>
                </div>
            </div>
            <FooterAdmin />
        </div >
    )
}