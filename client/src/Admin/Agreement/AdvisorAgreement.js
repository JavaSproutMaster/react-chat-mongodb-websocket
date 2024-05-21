import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FooterAdmin from '../../Components/Admin/Footer/FooterAdmin'
import AdminNavbar from '../../Components/Admin/Navbar/AdminNavbar'
import Sidebar from '../../Components/Admin/Sidebar/Sidebar'
import axios from 'axios';
import swal from 'sweetalert';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'   

export default function AdvisorAgreement() {

    
    const [agreement, setAgreement] = useState();
    const [agrId, setAgrId] = useState();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/admin/advisor-agreement`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(result => {
            setAgreement(result.data.data.agreement);
            setAgrId(result.data.data._id);

        });
    }, []);

    const handleSubmit = (e) => {

        e.preventDefault();

        const formData = {
            agreement: agreement,

        }

        axios.put(`${process.env.REACT_APP_BASE_URL}/admin/advisor-agreement/${agrId}`, formData, {
            headers: {
                'Authorization': `Bearer ` + localStorage.getItem('accessToken')
            },
        }).then(res => {
            if (res.data.success === true) {
                swal("Data is updated successfully", "success");
                //  navigate(`/admin/advisors`);

            } else if (res.data.error) {
                swal(res.data.error.message, "error");

            }
        });

    }

    function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("files", file);
            fetch(`${process.env.REACT_APP_BASE_URL}/admin/pages/upload-image`, {
              method: "post",
              body: body
              // mode: "no-cors"
            })
              .then((res) => res.json())
              .then((res) => {
                resolve({
                  default: `${process.env.REACT_APP_BASE_URL}/${res.data}`
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      }
    };
  }
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }


    return (
        <div className="relative md:ml-64 bg-default-skin">
            <Sidebar />
            <AdminNavbar />
            <div className="flex flex-wrap min600">
                <div className="w-full mb-12 xl:mb-0 px-4 padding-top80 gridstyle">
                    <h1 className='text-2xl text-black font-bold mb-3'>Advisor Agreement</h1>
                    <form className='mt-4 shadow-md p-4 rounded bg-white' onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label className="d-block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Agreement</label>
                            <CKEditor
                                config={{
                                    extraPlugins: [uploadPlugin]
                                }}
                                editor={ ClassicEditor }
                                data = {agreement}
                                onChange={ ( event, editor ) => {
                                    const data = editor.getData();
                                    setAgreement(data);
                                } }
                                onReady={(editor) => {}}
                                onBlur={(event, editor) => {}}
                                onFocus={(event, editor) => {}}
                            />
                            {/* <textarea id="Message" rows="10" onChange={(e) => setAgreement(e.target.value)} defaultValue={agreement} className="block mb-5 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Agreement Details'></textarea> */}
                        </div>
                        <div className='flex'>
                            <button type="submit" className="text-white bg-package-maroon font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center">Submit</button>
                            <Link to='/admin/dashboard' className="text-white bg-dark font-medium rounded text-sm max-w-xs sm:w-auto px-5 py-2.5 text-center ml-2">Go Back</Link>
                        </div>
                    </form>
                </div>
            </div>
            <FooterAdmin />
        </div>
    )
}
