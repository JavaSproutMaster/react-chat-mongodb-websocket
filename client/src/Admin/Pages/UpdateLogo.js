import React , { useState , useEffect } from 'react'
import Sidebar from '../../Components/Admin/Sidebar/Sidebar'
import AdminNavbar from '../../Components/Admin/Navbar/AdminNavbar'
import FooterAdmin from '../../Components/Admin/Footer/FooterAdmin'
import swal from 'sweetalert';
import axios from 'axios';

export default function UpdateLogo() {

    const [selectedLogo, setSelectedLogo] = useState();
    const [logo,setLogo] = useState('');

    const HandleImage = (e) => {
        setSelectedLogo(e.target.files[0]);
        setLogo(e.target.files[0]);
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/settings/global/logo`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(result => {
            setLogo(result.data.data);
        });
    }, []);

    const SubmitLogo = () => {

        const formData = new FormData();

        if(logo) {
            formData.append("logo", logo);
        }
        
        if(logo === '') {
            swal("error", "Please select file first", "error");
        } else {
            axios.post(`${process.env.REACT_APP_BASE_URL}/admin/settings/global/upload-logo`, formData, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'content-type': 'multipart/form-data',
                    'Authorization': `Bearer ` + localStorage.getItem('accessToken')
                },
            }).then(result => {
                swal("success", "Saved", "success");
            });
        } 
    }

  return (
    <div className='relative md:ml-64 bg-default-skin'>
        <Sidebar/>
        <AdminNavbar/>
        <div className="flex flex-wrap min600">
            <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 gridstyle">
                <h1 className='text-2xl text-black font-bold mb-3'>Upload Logo</h1>
                <form className='upload-logo-admin mt-4 shadow-md p-4 rounded bg-white'>
                    <div className='row'>
                        <div className='col-sm-12'>
                        <input type="file" id="logo" onChange={HandleImage} />
                        <div className="label-holder mt-2">
                            <label className="label">
                                <i className="material-icons">Upload Logo (260 px X 41 px)</i>
                            </label>
                        </div>
                        </div>
                        {
                            logo && !selectedLogo &&
                               <>
                                    <img src={`${process.env.REACT_APP_BASE_URL}/${logo}`} />
                               </> 
                            
                        }
                        {selectedLogo && (
                            <div className='col-sm-12'>
                                <img
                                    src={URL.createObjectURL(selectedLogo)}
                                    alt="Thumb" 
                                />
                            </div>
                        )}  
                    </div>   
                    <div className='mt-2'>
                        <button type="button" onClick={SubmitLogo} className="text-white bg-package-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Save</button>
                    </div>
                </form>
            </div>
        </div>
        <FooterAdmin/>
    </div>
  )
}
